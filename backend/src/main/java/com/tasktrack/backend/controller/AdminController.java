package com.tasktrack.backend.controller;

import com.tasktrack.backend.entity.Student;
import com.tasktrack.backend.entity.Task;
import com.tasktrack.backend.repository.StudentRepo;
import com.tasktrack.backend.service.AdminService;
import com.tasktrack.backend.service.StudentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/admin")
@RequiredArgsConstructor
public class AdminController {

//    private final StudentService studentService;
    private final AdminService adminService;

    @GetMapping("getallstudents")
    public List<Student> getAllStudents(){
        return adminService.getAllStudents();
    }

    @GetMapping("/getalltasks")
    public List<Task> getAlltasks(){
        return adminService.getAlltasks();
    }

    @GetMapping("getTask/{id}")
    public List<Task> getTaskByStudent(@PathVariable String id){
        return adminService.getTaskByStudent(id);
    }

    @PostMapping("/assigntask")
    public String assigntask(@RequestBody Task task){
        adminService.assignTask(task);
        return "task assigned successfully";
    }

    @DeleteMapping("/delete/{id}")
    @Transactional
    public String deleteTask(@PathVariable String id){
        adminService.deleteTask(Long.valueOf(id));
        return "deleted successfully";
    }

    @PostMapping(value = "/uploadFile", consumes = {"multipart/form-data"})
    public ResponseEntity<Integer> uploadtaskFile(
            @RequestPart("file")MultipartFile file
            ) throws IOException{
        return ResponseEntity.ok(adminService.uploadFile(file));
    }
}
