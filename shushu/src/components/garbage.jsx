function onDragOver(event) {
  setDragCheck((prev) => !prev);
  const { active, over } = event;
  if (!over) {
    return;
  }

  const activeId = active.id;
  const overId = over.id;

  if (activeId === overId) {
    return;
  }

  const isActiveATask = active.data.current?.type === "Task";
  const isOverATask = over.data.current?.type === "Task";

  if (!isActiveATask) {
    return;
  }

  if (isActiveATask && isOverATask) {
    setTasks((prevTasks) => {
      const activeIndex = prevTasks.findIndex((t) => t.id === activeId);
      const overIndex = prevTasks.findIndex((t) => t.id === overId);

      const updatedTasks = [...prevTasks];
      updatedTasks[activeIndex].columnId = updatedTasks[overIndex].columnId;

      // Update task status in the database
      updateTaskStatus(
        updatedTasks[activeIndex].id,
        updatedTasks[overIndex].columnId
      );

      return updatedTasks;
    });
  }

  const isOverAColumn = over.data.current?.type === "Column";

  if (isActiveATask && isOverAColumn) {
    setTasks((prevTasks) => {
      const activeIndex = prevTasks.findIndex((t) => t.id === activeId);

      const updatedTasks = [...prevTasks];
      updatedTasks[activeIndex].columnId = overId;

      // Update task status in the database
      updateTaskStatus(updatedTasks[activeIndex].id, overId);

      return updatedTasks;
    });
  }
}
