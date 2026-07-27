export class AsyncQueue {
  private queue: (() => Promise<unknown>)[] = [];
  private isProcessing = false;

  enqueue<T>(task: () => Promise<T> | T): Promise<T> {
    return new Promise((resolve, reject) => {
      this.queue.push(async () => {
        try {
          const result = await task();
          resolve(result);
          return result;
        } catch (error) {
          reject(error instanceof Error ? error : new Error(String(error)));
        }
      });

      void this.processQueue();
    });
  }

  private async processQueue() {
    if (this.isProcessing) return;

    const nextTask = this.queue.shift();

    if (!nextTask) return;

    this.isProcessing = true;

    try {
      await nextTask();
    } catch (error) {
      console.error('Error processing task in AsyncQueue:', error);
    } finally {
      this.isProcessing = false;
    }
    void this.processQueue();
  }
}
