package com.tasktrack.backend.service;

import com.opencsv.bean.CsvToBean;
import com.opencsv.bean.CsvToBeanBuilder;
import com.opencsv.bean.HeaderColumnNameMappingStrategy;
import com.tasktrack.backend.entity.Role;
import com.tasktrack.backend.entity.Student;
import com.tasktrack.backend.entity.Task;
import com.tasktrack.backend.entity.TaskCsvRepresentation;
import com.tasktrack.backend.repository.StudentRepo;
import com.tasktrack.backend.repository.TaskRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.Reader;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AdminService {

    private final StudentRepo studentRepo;
    private final TaskRepo taskRepo;
    private final EmailService emailService;



    public List<Student> getAllStudents() {
        return studentRepo.findAll()
                .stream()
                .filter(p->p.getRole().equals(Role.STUDENT))
                .collect(Collectors.toList());
    }

    public List<Task> getTaskByStudent(String id) {
        return taskRepo.findAllByStudentId(id);
    }

    public void assignTask(Task task) {
        taskRepo.save(task);
        String email = findStudentEmail(task.getStudentId());
        emailService.sendEmail(email, "A new task has been assigned for you", task.toString());
    }

    private String findStudentEmail(String studentId) {
        Optional<Student> student = studentRepo.findById(studentId);
        if(student.isPresent()){
            Student student1 = student.get();
            return student1.getEmail();
        }
        return null;
    }

    public List<Task> getAlltasks() {
        return taskRepo.findAll();
    }

    public void deleteTask(Long id) {
        taskRepo.deleteById(id);
    }

    public Integer uploadFile(MultipartFile file) throws IOException {
        Set<Task>  taskSet = parseCSV(file);
        taskRepo.saveAll(taskSet);
        return taskSet.size();
    }

    private Set<Task> parseCSV(MultipartFile file) throws IOException {
        try(Reader reader = new BufferedReader(new InputStreamReader(file.getInputStream()))){
            HeaderColumnNameMappingStrategy<TaskCsvRepresentation> strategy =
                    new HeaderColumnNameMappingStrategy<>();
            strategy.setType(TaskCsvRepresentation.class);
            CsvToBean<TaskCsvRepresentation> csvToBean = new CsvToBeanBuilder<TaskCsvRepresentation>(reader)
                    .withMappingStrategy(strategy)
                    .withIgnoreEmptyLine(true)
                    .withIgnoreLeadingWhiteSpace(true)
                    .build();
            return csvToBean.parse().stream()
                    .map(csvLine -> Task.builder()
                            .taskName(csvLine.getTaskName())
                            .studentId(csvLine.getStudentId())
                            .studentName(csvLine.getStudentName())
                            .deadline(csvLine.getDeadline())
                            .pending(csvLine.getPending())
                            .build()
                    ).collect(Collectors.toSet());

        }
    }
}
