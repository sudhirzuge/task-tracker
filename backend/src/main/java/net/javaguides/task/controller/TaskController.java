package net.javaguides.task.controller;

import lombok.AllArgsConstructor;
import net.javaguides.task.dto.TaskDto;
import net.javaguides.task.service.TaskService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@AllArgsConstructor
@RestController
@RequestMapping("/api/tasks")
public class TaskController {

    private TaskService taskService;

    // build add task rest api
    @PostMapping
    public ResponseEntity<TaskDto> createTask(@RequestBody TaskDto taskDto){
        TaskDto savedTask = taskService.createTask(taskDto);
        return new ResponseEntity<>(savedTask, HttpStatus.CREATED);
    }

    // build get task rest api
    @GetMapping("{id}")
    public ResponseEntity<TaskDto> getEmployeeById(@PathVariable("id") Long taskId){
        TaskDto employeeDto = taskService.getTaskById(taskId);
        return ResponseEntity.ok(employeeDto);
    }

    // Build Get All task REST API
    @GetMapping
    public ResponseEntity<List<TaskDto>> getAllEmployees(){
        List<TaskDto> tasks = taskService.getAllTasks();
        return ResponseEntity.ok(tasks);
    }

    // Build Update task REST API
    @PutMapping("{id}")
    public ResponseEntity<TaskDto> updateTask(@PathVariable("id") Long taskId,
                                                      @RequestBody TaskDto updatedTask){
        TaskDto employeeDto = taskService.updateTask(taskId, updatedTask);
        return ResponseEntity.ok(employeeDto);
    }

    // Build Delete task REST API
    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteTask(@PathVariable("id") Long taskId){
        taskService.deleteTask(taskId);
        return ResponseEntity.ok("Task deleted successfully!.");
    }
}

