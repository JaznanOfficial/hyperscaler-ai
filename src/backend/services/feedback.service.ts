import { feedbackRepository } from "@/backend/repositories/feedback.repository";
import { feedbackEvents } from "@/lib/feedback-events";

export class FeedbackService {
  async createFeedback(data: {
    projectId: string;
    employeeId: string;
    heading: string;
    details: string;
  }) {
    const feedback = await feedbackRepository.create({
      projectId: data.projectId,
      employeeId: data.employeeId,
      heading: data.heading,
      details: data.details,
      read: false,
    });

    feedbackEvents.notifyNewFeedback(data.employeeId);

    return feedback;
  }

  async markAsRead(id: string) {
    return feedbackRepository.update(id, {
      read: true,
    });
  }

  async getAllFeedbacks(page: number, limit: number) {
    const { feedbacks, total } = await feedbackRepository.findAll(page, limit);

    return {
      feedbacks,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async getEmployeeFeedbacks(employeeId: string, page: number, limit: number) {
    const { feedbacks, total, unreadCount } =
      await feedbackRepository.findByEmployeeId(employeeId, page, limit);

    return {
      feedbacks,
      unreadCount,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async getEmployeeFeedbacksWithFilters(
    employeeId: string,
    filters?: {
      onlyUnread?: boolean;
      daysBack?: number;
    }
  ) {
    const { feedbacks, total, unreadCount } =
      await feedbackRepository.findByEmployeeIdWithFilters(employeeId, filters);

    return {
      feedbacks,
      unreadCount,
      total,
    };
  }

  async getUnreadCount(employeeId: string) {
    return feedbackRepository.countUnreadByEmployeeId(employeeId);
  }
}

export const feedbackService = new FeedbackService();
