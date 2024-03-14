package com.tasktrack.backend.controller;

import com.tasktrack.backend.dto.StudentDTO;
import com.tasktrack.backend.entity.Student;
import com.tasktrack.backend.entity.Task;
import com.tasktrack.backend.service.StudentService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin
@RequestMapping("/student")
@RequiredArgsConstructor
public class StudentController {

    private final StudentService studentService;

    @GetMapping("/tasks/{id}")
    public List<Task> getStudentTask(@PathVariable String id){
        return studentService.getTask(id);
    }
    @GetMapping("/pending/{id}")
    public List<Task> pendingtasks(@PathVariable String id){
        return studentService.getPendingTasks(id);
    }

    @GetMapping("/profile/{id}")
    public StudentDTO getProfile(@PathVariable String id){
        return studentService.getProfile(id);
    }

    @PostMapping("/update/{taskId}")
    public String updatepending(@PathVariable String taskId){
        studentService.updatePending(Long.valueOf(taskId));
        return "updated ";
    }

//    @GetMapping("/deadline/{id}")
//    public int deadline(@PathVariable String id){
//        return studentService.getDeadlineCounts(id);
//
//    }
}
