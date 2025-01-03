package com.piotrkowalczykk.dormitory_management_app.feed.controller;

import com.piotrkowalczykk.dormitory_management_app.admin.model.Academy;
import com.piotrkowalczykk.dormitory_management_app.feed.dto.SelectAcademyRequest;
import com.piotrkowalczykk.dormitory_management_app.feed.service.FeedService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/feed")
public class FeedController {

    private final FeedService feedService;

    public FeedController(FeedService feedService) {
        this.feedService = feedService;
    }

    @GetMapping("/academies")
    public ResponseEntity<List<Academy>> getAllAcademies(){
       List<Academy> listOfAcademies = feedService.getAllAcademies();
       return ResponseEntity.ok(listOfAcademies);
    }

    @PostMapping("/select-academy")
    public ResponseEntity<String> selectAcademy(@RequestBody SelectAcademyRequest selectAcademyRequest){
        feedService.selectAcademy(selectAcademyRequest);
        return ResponseEntity.ok("Academy selected successfully");
    }
}