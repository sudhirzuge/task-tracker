package net.javaguides.task.service.impl;

import lombok.AllArgsConstructor;
import net.javaguides.task.dto.TaskDto;
import net.javaguides.task.entity.Task;
import net.javaguides.task.exception.ResourceNotFoundException;
import net.javaguides.task.mapper.TaskMapper;
import net.javaguides.task.repository.TaskRepository;
import net.javaguides.task.service.TaskService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class TaskServiceImpl implements TaskService {

    private TaskRepository taskRepository;

    @Override
    public TaskDto createTask(TaskDto taskDto) {
        Task task = TaskMapper.mapToTask(taskDto);
        Task savedTask = taskRepository.save(task);
        return TaskMapper.mapToTaskDto(savedTask);
    }

    @Override
    public TaskDto getTaskById(Long taskId) {
        Task task = taskRepository.findById(taskId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("task is not exist with given id :"+taskId));
        return TaskMapper.mapToTaskDto(task);
    }

    @Override
    public List<TaskDto> getAllTasks() {
        List<Task> tasks = taskRepository.findAll();
        return tasks.stream().map((task)-> TaskMapper.mapToTaskDto(task))
                .collect(Collectors.toList());
    }

    @Override
    public TaskDto updateTask(Long taskId, TaskDto updateTask) {
        Task task = taskRepository.findById(taskId).orElseThrow(
                ()-> new ResourceNotFoundException("task is not exist with given id :"+taskId));

        task.setTitle(updateTask.getTitle());
        task.setDescription(updateTask.getDescription());
        task.setDueDate(updateTask.getDueDate());
        task.setStatus(updateTask.getStatus());

        Task updatedTaskObj = taskRepository.save(task);
        return TaskMapper.mapToTaskDto(updatedTaskObj);
    }

    @Override
    public void deleteTask(Long taskId) {

        Task task = taskRepository.findById(taskId).orElseThrow(
                ()-> new ResourceNotFoundException("task is not exist with given id :"+taskId));

        taskRepository.deleteById(taskId);
    }
}


