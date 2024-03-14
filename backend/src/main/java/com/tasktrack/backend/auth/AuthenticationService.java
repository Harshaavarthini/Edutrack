package com.tasktrack.backend.auth;

import com.tasktrack.backend.config.JwtService;
import com.tasktrack.backend.entity.Role;
import com.tasktrack.backend.entity.Student;
import com.tasktrack.backend.exception.UserNotFoundException;
import com.tasktrack.backend.repository.StudentRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.regex.Matcher;
import java.util.regex.Pattern;




@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final StudentRepo studentRepo;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;

    private final JwtService jwtService;
    public AuthenticationResponse register(RegisterRequest request) {

        Optional<Student> student = studentRepo.findByEmail(request.getEmail());

//        if(student.isPresent()){
//            throw new ;
//        }

        Role role = Role.STUDENT;
        if (request.getName().toLowerCase().contains("admin")) {
            role = Role.ADMIN;
        }
        var user = Student.builder()
                .name((request.getName().strip()))
                .email((request.getEmail()))
                .id(request.getId())
                .department(request.getDepartment())
                .dob(request.getDob())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(role)
                .build();
        studentRepo.save(user);
        //System.out.println(user);
        var jwtToken = jwtService.generateToken(user);
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .build();
    }

    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );
        var user = studentRepo.findByEmail(request.getEmail())
                .orElseThrow(()-> new UserNotFoundException("User not found with given email"));
        var jwtToken = jwtService.generateToken(user);
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .build();
    }


    private boolean isValidEmail(String email) {
        String regexPattern = "[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,3}";
        Pattern pattern = Pattern.compile(regexPattern, Pattern.CASE_INSENSITIVE);
        Matcher matcher = pattern.matcher(email);
        return matcher.matches();
    }
}