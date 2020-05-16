package com.sha.serverside.controller;

import com.sha.serverside.jwt.JwtTokenProvider;
import com.sha.serverside.model.ModuleContent;
import com.sha.serverside.service.CourseService;
import org.apache.commons.io.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;

@RestController
public class CourseController {

    @Autowired
    private JwtTokenProvider tokenProvider;

    @Autowired
    private CourseService courseService;

    @GetMapping("/api/course/{courseId}/modules")
    public ResponseEntity<?> getAllCourses(@PathVariable Long courseId){
        return ResponseEntity.ok(courseService.findAllModules(courseId));
    }

    @GetMapping("/api/course/{courseId}")
    public ResponseEntity<?> findCourseById(@PathVariable Long courseId){
        return ResponseEntity.ok(courseService.findCourseById(courseId));
    }

    @GetMapping("/api/course/modules/{moduleId}/content")
    public ResponseEntity<?> getModuleContent(@PathVariable Long moduleId){
        return ResponseEntity.ok(courseService.getModuleContent(moduleId));
    }

    @GetMapping("/api/course/modules/{moduleId}")
    public ResponseEntity<?> findModuleById(@PathVariable Long moduleId){
        return ResponseEntity.ok(courseService.findModuleById(moduleId));
    }

    @PostMapping("/api/course/modules/addModule")
    public ResponseEntity<?> addNewModuleContent(@RequestBody ModuleContent moduleContent){
        return new ResponseEntity<>(courseService.addModuleContent(moduleContent),HttpStatus.CREATED);
    }

    @PostMapping("/api/course/modules/addModuleFile")
    public ResponseEntity<?> addNewModuleContent(@RequestParam("file") MultipartFile file, @RequestParam ModuleContent module) {
        return new ResponseEntity<>(courseService.uploadMaterial(file, module),HttpStatus.CREATED);
    }


    @RequestMapping(value="/api/course/modules/download", method = RequestMethod.GET)
    public @ResponseBody ResponseEntity downloadMaterial(@RequestParam("file") String file) throws IOException {
        ResponseEntity respEntity = uploadFile(file);
        return respEntity;
    }

    private ResponseEntity uploadFile(String fileName) throws IOException {
        ResponseEntity respEntity = null;

        File result=new File(fileName);

        if(result.exists()){
            InputStream inputStream = new BufferedInputStream(new FileInputStream(result));
            String type=result.toURL().openConnection().guessContentTypeFromName(fileName);

            byte[] out = IOUtils.toByteArray(inputStream);
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_PDF);
            respEntity = new ResponseEntity(out, headers, HttpStatus.OK);
        }else{
            respEntity = new ResponseEntity ("File Not Found", HttpStatus.OK);
        }
        return respEntity;
    }
}
