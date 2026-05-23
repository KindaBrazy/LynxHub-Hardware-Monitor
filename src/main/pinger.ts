import {exec} from 'node:child_process';
import {platform} from 'node:os';

import {PingConfig, PingResult} from '../cross/types';

export class Pinger {
  private readonly config: Required<PingConfig>;
  private readonly isWindows: boolean;
  private running: boolean = false;
  private timer: NodeJS.Timeout | null = null;

  // Callbacks for consumers to handle the events
  public onResult?: (result: PingResult) => void;
  public onError?: (error: Error) => void;

  constructor(config: PingConfig) {
    this.config = {
      host: config.host,
      intervalMs: config.intervalMs,
      timeoutMs: config.timeoutMs ?? 2000,
    };
    this.isWindows = platform() === 'win32';
  }

  /**
   * Starts the ping loop.
   */
  public start(): void {
    if (this.running) return;
    this.running = true;
    this.loop();
  }

  /**
   * Stops the ping loop.
   */
  public stop(): void {
    this.running = false;
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
  }

  /**
   * Recursive loop to ensure pings do not overlap if the response
   * takes longer than the specified interval.
   */
  private async loop(): Promise<void> {
    if (!this.running) return;

    const startTime = Date.now();
    try {
      const result = await this.ping();
      if (this.onResult) {
        this.onResult(result);
      }
    } catch (err) {
      if (this.onError) {
        this.onError(err instanceof Error ? err : new Error(String(err)));
      }
    }

    const elapsed = Date.now() - startTime;
    const delay = Math.max(0, this.config.intervalMs - elapsed);

    if (this.running) {
      this.timer = setTimeout(() => this.loop(), delay);
    }
  }

  /**
   * Executes a single ping command and parses the output.
   */
  private ping(): Promise<PingResult> {
    return new Promise(resolve => {
      const command = this.buildCommand();
      const timestamp = new Date();

      exec(command, (error, stdout, stderr) => {
        const result: PingResult = {
          host: this.config.host,
          alive: false,
          timestamp,
        };

        if (error) {
          result.error = stderr || error.message;
          result.rawOutput = stdout;
          return resolve(result);
        }

        const latency = this.parseLatency(stdout);
        if (latency !== null) {
          result.alive = true;
          result.latency = latency;
        } else {
          result.alive = false;
          result.rawOutput = stdout;
        }

        resolve(result);
      });
    });
  }

  /**
   * Generates the appropriate OS-specific ping command.
   */
  private buildCommand(): string {
    const {host, timeoutMs} = this.config;

    if (this.isWindows) {
      // -n 1: send 1 packet
      // -w: timeout in milliseconds
      return `ping -n 1 -w ${timeoutMs} ${host}`;
    } else {
      // -c 1: send 1 packet
      // -W: timeout in seconds (rounded up to avoid 0)
      const timeoutSec = Math.max(1, Math.ceil(timeoutMs / 1000));
      return `ping -c 1 -W ${timeoutSec} ${host}`;
    }
  }

  /**
   * Extract latency in milliseconds from standard ping output.
   */
  private parseLatency(stdout: string): number | null {
    // Regex matches common patterns like: "time=14.2 ms", "time=12ms", "time<1ms"
    const match = /time[=<]([\d.]+)\s*ms/i.exec(stdout);
    if (match && match[1]) {
      const parsed = parseFloat(match[1]);
      return isNaN(parsed) ? null : parsed;
    }
    return null;
  }
}
