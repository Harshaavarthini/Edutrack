package com.tasktrack.backend.service;

import com.tasktrack.backend.dto.StudentDTO;
import com.tasktrack.backend.entity.Student;
import com.tasktrack.backend.entity.Task;
import com.tasktrack.backend.repository.StudentRepo;
import com.tasktrack.backend.repository.TaskRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class StudentService {

    private final TaskRepo taskRepo;
    private final StudentRepo studentRepo;

    public List<Task> getTask(String id) {
        return taskRepo.findAllByStudentId(id);
    }

    public List<Task> getPendingTasks(String id){
        return taskRepo.findAllByStudentId(id)
                .stream()
                .filter(p-> p.getPending().equals("Pending"))
                .collect(Collectors.toList());
    }

    public StudentDTO getProfile(String id) {
        Optional<Student> student = studentRepo.findById(id);
        StudentDTO studentDTO = null;
        if(student.isPresent()){
            Student student1 = student.get();
            studentDTO = StudentDTO.builder()
                    .id(student1.getId())
                    .name(student1.getName())
                    .email(student1.getEmail())
                    .department(student1.getDepartment())
                    .dob(student1.getDob())
                    .build();
        }
        return studentDTO;
    }

    public void updatePending(Long taskId) {
        taskRepo.updatePending(taskId);
    }

//    public int getDeadlineCounts(String id) {
//       return taskRepo.getDeadline(id);
//    }
}
