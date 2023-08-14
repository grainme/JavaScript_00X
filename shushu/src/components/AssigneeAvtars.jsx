/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import debounce from "lodash/debounce";

export function AssigneeAvatars(props) {
  const [assignees, setAssignees] = useState([]); // Initialize with an empty array
  const supabase = useSupabaseClient();
  const user = useUser();

  const fetchAssignees = async () => {
    try {
      const { data: taskData, error: taskError } = await supabase
        .from("tasks")
        .select("assignee")
        .eq("id", props.taskId);

      if (taskError) {
        console.error("Error fetching tasks:", taskError);
        return;
      }

      // Assuming assignee is a JSON array, and each element has name and avatar
      const assigneeArray = taskData[0]?.assignee || [];
      setAssignees(assigneeArray);
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  useEffect(() => {
    if (user && props.taskId) {
      fetchAssignees();
      supabase
        .channel("table-db-changes")
        .on(
          "postgres_changes",
          {
            event: "*",
            schema: "public",
            table: "tasks",
          },
          (payload) => {
            fetchAssignees();
          }
        )
        .subscribe();
    }
  }, [user, assignees]); // Update when user or taskId changes

  return (
    <div className="flex items-center justify-center">
      <div className="flex -space-x-3 items-center">
        {assignees.map((assignee, index) => (
          <img
            key={index}
            src={assignee.avatar}
            className={props.classy}
            alt="assignee img"
          />
        ))}
      </div>
    </div>
  );
}
