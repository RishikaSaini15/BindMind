package com.sha.serverside.controller;

import antlr.debug.MessageAdapter;
import com.sha.serverside.jwt.JwtTokenProvider;
import com.sha.serverside.model.*;
import com.sha.serverside.service.CourseService;
import com.sha.serverside.service.CourseStudentService;
import com.sha.serverside.service.MessageService;
import com.sha.serverside.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;
import java.util.Optional;

@RestController
public class UserController {

    @Autowired
    private JwtTokenProvider tokenProvider;

    @Autowired
    private UserService userService;

    @Autowired
    private CourseService courseService;

    @Autowired
    private CourseStudentService courseStudentService;

    @Autowired
    private MessageService messageService;

    @PostMapping("/api/user/registration")
    public ResponseEntity<?> register(@RequestBody User user){
        if(userService.findByUsername(user.getUsername()) != null){
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }
        Role role = user.getRole();
        user.setRole(role);
        return new ResponseEntity<>(userService.saveUser(user), HttpStatus.CREATED);
    }

    @GetMapping("/api/user/login")
    public ResponseEntity<?> getUser(Principal principal){
        if(principal == null){
            //This should be ok http status because here will be logout path.
            return ResponseEntity.ok(principal);
        }
        UsernamePasswordAuthenticationToken authenticationToken = (UsernamePasswordAuthenticationToken) principal;
        User user = userService.findByUsername(authenticationToken.getName());
        user.setToken(tokenProvider.generateToken(authenticationToken));
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @PostMapping("/api/user/enroll")
    public ResponseEntity<?> enrollCourse(@RequestBody CourseStudent courseStudent){
        return new ResponseEntity<>(courseStudentService.saveCourseStudent(courseStudent), HttpStatus.CREATED);
    }

    @GetMapping("/api/user/courses")
    public ResponseEntity<?> getAllCourses(){
        return ResponseEntity.ok(courseService.findAllCourses());
    }



    @PostMapping("/api/user/profileupdate")
    public ResponseEntity<?> profileUpdate(@RequestBody User user){
        System.out.println("profileupdate");
        System.out.println(user.getUsername());
        // System.out.println(user.getRole());
        //if(userService.findByUsername(user.getUsername()) != null){
        //  return new ResponseEntity<>(HttpStatus.CONFLICT);
        //}


        //Role role = user.getRole();
        //user.setRole(role);
        return new ResponseEntity<>(userService.updateUser(user), HttpStatus.CREATED);

    }

    // Messages API

    @GetMapping("/api/user/messages/conversations/{userId}")
    public ResponseEntity<?> getConversationsByUserId(@PathVariable Long userId){
        List<Conversations> conversationsList =
                messageService.getConversationsByUserID(userId);
        return new ResponseEntity<>(conversationsList, HttpStatus.OK);
    }

    @GetMapping("/api/user/messages/conversationsrecep/{userId}")
    public ResponseEntity<?> getConversations2ByUserId(@PathVariable Long userId){
        List<Conversations> conversationsList =
                messageService.getConversations2ByUserID(userId);
        return new ResponseEntity<>(conversationsList, HttpStatus.OK);
    }

    @GetMapping("/api/user/messages/conversationmeta/{convoid}")
    public ResponseEntity<?> getConversationTitle(@PathVariable Long convoid){
        Optional<Conversations> convoContent =
                messageService.getConversationMeta(convoid);
        return new ResponseEntity<>(convoContent, HttpStatus.OK);
    }

    @GetMapping("/api/user/messages/conversation/{convoid}")
    public ResponseEntity<?> getConversation(@PathVariable Long convoid){
        List<Messages> messagesList =
                messageService.getConversation(convoid);
        return new ResponseEntity<>(messagesList, HttpStatus.OK);
    }

    @PostMapping("/api/user/messages/newMessage/")
    public ResponseEntity<?> saveMessage(@RequestBody Messages message){
        return new ResponseEntity<>(messageService.saveMessage(message), HttpStatus.CREATED);
    }

    @GetMapping("/api/user/messages/getrecipinfo/{name}")
    public ResponseEntity<?> getConversation(@PathVariable String name){
        User recipient = userService.findByUsername(name);
        return new ResponseEntity<>(recipient, HttpStatus.OK);
    }

    @PostMapping("/api/user/messages/newconversation/")
    public ResponseEntity<?> saveConversation(@RequestBody Conversations conversations){
        return new ResponseEntity<>(messageService.saveConversation(conversations), HttpStatus.CREATED);
    }






}
