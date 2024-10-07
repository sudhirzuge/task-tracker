package net.javaguides.task.service;

import net.javaguides.task.dto.TaskDto;

import java.util.List;

public interface TaskService {
    TaskDto createTask(TaskDto taskDto);
    TaskDto getTaskById(Long taskId);
    List<TaskDto> getAllTasks();
    TaskDto updateTask(Long taskId, TaskDto updatedTask);
    void deleteTask(Long taskId);
}

