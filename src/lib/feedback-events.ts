import { EventEmitter } from "events";

class FeedbackEventEmitter extends EventEmitter {
  constructor() {
    super();
    this.setMaxListeners(100);
  }

  notifyNewFeedback(employeeId: string) {
    try {
      this.emit(`feedback:${employeeId}`);
    } catch (error) {
      console.error("Error emitting feedback event:", error);
    }
  }

  onNewFeedback(employeeId: string, callback: () => void) {
    try {
      this.on(`feedback:${employeeId}`, callback);
    } catch (error) {
      console.error("Error registering feedback listener:", error);
    }
  }

  offNewFeedback(employeeId: string, callback: () => void) {
    try {
      this.off(`feedback:${employeeId}`, callback);
    } catch (error) {
      console.error("Error removing feedback listener:", error);
    }
  }

  getListenerCount(employeeId: string): number {
    return this.listenerCount(`feedback:${employeeId}`);
  }
}

export const feedbackEvents = new FeedbackEventEmitter();
