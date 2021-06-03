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
import com.payroll.payrollbackend.model.Position;
import com.payroll.payrollbackend.repository.PositionRepository;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/position")
public class PositionController {

			@Autowired
			private PositionRepository positionRepository;
			
			// get all position
			@GetMapping("/list")
			public List<Position> getAllPosition(){
				return positionRepository.findAll();
			}		
			
			// create position
			@PostMapping("/list")
			public Position createPosition(@RequestBody Position position) {
				return positionRepository.save(position);
			}
		
			
			// get position  by id 
			@GetMapping("/list/{id}")
			public ResponseEntity<Position> getPositionById(@PathVariable Long id) {
				Position position = positionRepository.findById(id)
						.orElseThrow(() -> new ResourceNotFoundException("thia position type  not exist with id :" + id));
				return ResponseEntity.ok(position);
			}
			
			//update position
			@PutMapping("/list/{id}")
			public ResponseEntity<Position> updatePosition(@PathVariable Long id, @RequestBody Position allowanceD){
				Position position = positionRepository.findById(id)
						.orElseThrow(() -> new ResourceNotFoundException("this position type not exist with id :" + id));
				
				position.setPositionId(allowanceD.getPositionId());
				position.setPositionName(allowanceD.getPositionName());
				position.setPositionSalary(allowanceD.getPositionSalary());
				Position updatedPosition =positionRepository.save(position);
				return ResponseEntity.ok(updatedPosition);
			}
			
			//delete position
			@DeleteMapping("/list/{id}")
			public ResponseEntity<Map<String, Boolean>> deletePosition(@PathVariable Long id){
				Position position = positionRepository.findById(id)
						.orElseThrow(() -> new ResourceNotFoundException("position type not  exist with id :" + id));
				positionRepository.delete(position);
				Map<String, Boolean> responce = new HashMap<>();
				responce.put("Deleted", Boolean.TRUE);
				return ResponseEntity.ok(responce);
				
			}

			
}
