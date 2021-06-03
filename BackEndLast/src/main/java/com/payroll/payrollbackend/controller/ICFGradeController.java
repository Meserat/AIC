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
import com.payroll.payrollbackend.model.ICFGrade;
import com.payroll.payrollbackend.repository.ICFGradeRepository;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/ICFGrade")
public class ICFGradeController {

			@Autowired
			private ICFGradeRepository positionRepository;
			
			// get all Section
			@GetMapping("/list")
			public List<ICFGrade> getAllSection(){
				return positionRepository.findAll();
			}		
			
			// create Section
			@PostMapping("/list")
			public ICFGrade createSection(@RequestBody ICFGrade position) {
				return positionRepository.save(position);
			}
					
			// get Section by id 
			@GetMapping("/list/{id}")
			public ResponseEntity<ICFGrade> getSectionById(@PathVariable Long id) {
				ICFGrade position = positionRepository.findById(id)
						.orElseThrow(() -> new ResourceNotFoundException("thiaSection type  not exist with id :" + id));
				return ResponseEntity.ok(position);
			}
			
			//updateSection
			@PutMapping("/list/{id}")
			public ResponseEntity<ICFGrade> updateSection(@PathVariable Long id, @RequestBody ICFGrade allowanceD){
				ICFGrade position = positionRepository.findById(id)
						.orElseThrow(() -> new ResourceNotFoundException("thisSection type not exist with id :" + id));
				
				position.setICFGradeId(allowanceD.getICFGradeId());
				position.setICFGradeName(allowanceD.getICFGradeName());
				
				ICFGrade updatedPosition =positionRepository.save(position);
				return ResponseEntity.ok(updatedPosition);
			}
			
			//delete Section
			@DeleteMapping("/list/{id}")
			public ResponseEntity<Map<String, Boolean>> deleteSection(@PathVariable Long id){
				ICFGrade position = positionRepository.findById(id)
						.orElseThrow(() -> new ResourceNotFoundException("Sectiontype not  exist with id :" + id));
				positionRepository.delete(position);
				Map<String, Boolean> responce = new HashMap<>();
				responce.put("Deleted", Boolean.TRUE);
				return ResponseEntity.ok(responce);
				
			}

}
