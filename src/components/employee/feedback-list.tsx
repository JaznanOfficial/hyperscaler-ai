"use client";

import { useQuery } from "@tanstack/react-query";
import { FeedbackListItem } from "@/components/employee/feedback-list-item";
import { useFeedbackStream } from "@/hooks/use-feedback-stream";

export type FeedbackItem = {
  id: string;
  projectId: string;
  employeeId: string;
  heading: string;
  details: string;
  read: boolean;
  createdAt: string;
  updatedAt: string;
};

type FeedbackListProps = {
  page: number;
  onPaginationChange?: (page: number, totalPages: number) => void;
};

async function fetchFeedbacks(page: number) {
  const response = await fetch(
    `/api/employee/feedbacks?page=${page}&limit=10`,
    {
      cache: "no-store",
    }
  );
  if (!response.ok) {
    throw new Error("Failed to fetch feedbacks");
  }
  return response.json();
}

export function FeedbackList({ page, onPaginationChange }: FeedbackListProps) {
  useFeedbackStream();

  const { data, isLoading, error } = useQuery({
    queryKey: ["employee-feedbacks", page],
    queryFn: () => fetchFeedbacks(page),
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30_000),
  });

  if (data?.pagination && onPaginationChange) {
    onPaginationChange(data.pagination.page, data.pagination.totalPages);
  }

  if (error) {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 p-8 text-center">
        <p className="text-red-600">
          Failed to load feedbacks. Please try again.
        </p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center">
        <p className="text-slate-500">Loading feedbacks...</p>
      </div>
    );
  }

  const feedbacks: FeedbackItem[] = data?.feedbacks || [];

  if (feedbacks.length === 0) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center">
        <p className="text-slate-500">No feedbacks yet</p>
      </div>
    );
  }

  return (
    <div>
      <ul className="list-none divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-white p-0">
        {feedbacks.map((item) => (
          <FeedbackListItem item={item} key={item.id} />
        ))}
      </ul>
    </div>
  );
}
