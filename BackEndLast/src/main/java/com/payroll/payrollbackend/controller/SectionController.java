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
import com.payroll.payrollbackend.model.Section;
import com.payroll.payrollbackend.repository.SectionRepository;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/section")
public class SectionController {

			@Autowired
			private SectionRepository positionRepository;
			
			// get all Section
			@GetMapping("/list")
			public List<Section> getAllSection(){
				return positionRepository.findAll();
			}		
			
			// create Section
			@PostMapping("/list")
			public Section createSection(@RequestBody Section position) {
				return positionRepository.save(position);
			}
		
			
			// get Section by id 
			@GetMapping("/list/{id}")
			public ResponseEntity<Section> getSectionById(@PathVariable Long id) {
				Section position = positionRepository.findById(id)
						.orElseThrow(() -> new ResourceNotFoundException("thiaSection type  not exist with id :" + id));
				return ResponseEntity.ok(position);
			}
			
			//updateSection
			@PutMapping("/list/{id}")
			public ResponseEntity<Section> updateSection(@PathVariable Long id, @RequestBody Section allowanceD){
				Section section = positionRepository.findById(id)
						.orElseThrow(() -> new ResourceNotFoundException("thisSection type not exist with id :" + id));
				
				section.setSectionId (allowanceD.getSectionId());
				section.setSectionName(allowanceD.getSectionName());
				
				Section updatedPosition =positionRepository.save(section);
				return ResponseEntity.ok(updatedPosition);
			}
			
			//delete Section
			@DeleteMapping("/list/{id}")
			public ResponseEntity<Map<String, Boolean>> deleteSection(@PathVariable Long id){
				Section position = positionRepository.findById(id)
						.orElseThrow(() -> new ResourceNotFoundException("Sectiontype not  exist with id :" + id));
				positionRepository.delete(position);
				Map<String, Boolean> responce = new HashMap<>();
				responce.put("Deleted", Boolean.TRUE);
				return ResponseEntity.ok(responce);
				
			}

}
