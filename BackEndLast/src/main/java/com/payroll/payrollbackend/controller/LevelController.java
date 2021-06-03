package com.payroll.payrollbackend.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.payroll.payrollbackend.exception.ResourceNotFoundException;
import com.payroll.payrollbackend.model.Level;
import com.payroll.payrollbackend.repository.LevelRepository;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/level")
public class LevelController {

			@Autowired
			private LevelRepository levelRepository;
			
			// get all Levels
			@GetMapping("/list")
			public List<Level> getAllLevel(){
				return levelRepository.findAll();
			}		
			
			// create level 
			@PostMapping("/list")
			public Level createLevel(@RequestBody Level level) {
				return levelRepository.save(level);
			}
		
			
			// get level by id 
			@GetMapping("/list/{id}")
			public ResponseEntity<Level> getLevelById(@PathVariable Long id) {
				Level level = levelRepository.findById(id)
						.orElseThrow(() -> new ResourceNotFoundException("thia level type  not exist with id :" + id));
				return ResponseEntity.ok(level);
			}
			
			//update level
			@PutMapping("/list/{id}")
			public ResponseEntity<Level> updateLevel(@PathVariable Long id, @RequestBody Level allowanceD){
				Level level =levelRepository.findById(id)
						.orElseThrow(() -> new ResourceNotFoundException("this level type not exist with id :" + id));
				
				level.setLevelId(allowanceD.getLevelId());
				level.setLevelName(allowanceD.getLevelName());
				
				Level updatedLevel =levelRepository.save(level);
				return ResponseEntity.ok(updatedLevel);
			}
			
			//delete level
			@DeleteMapping("/list/{id}")
			public ResponseEntity<Map<String, Boolean>> deleteLevel(@PathVariable Long id){
				Level level = levelRepository.findById(id)
						.orElseThrow(() -> new ResourceNotFoundException("level type not  exist with id :" + id));
				levelRepository.delete(level);
				Map<String, Boolean> responce = new HashMap<>();
				responce.put("Deleted", Boolean.TRUE);
				return ResponseEntity.ok(responce);
				
			}

}		
