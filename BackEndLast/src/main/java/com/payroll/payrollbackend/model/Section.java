package com.payroll.payrollbackend.model;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "section")
public class Section {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long sectionId;
	
	@Column
	private String sectionName;
	
	@JsonIgnore
	@OneToMany(mappedBy = "directorateId", cascade=CascadeType.ALL)
	private List<Directorate> directoraties;
	
	
	
   public List<Directorate> getDirectoraties() {
		return directoraties;
	}
	public void setDirectoraties(List<Directorate> directoraties) {
		this.directoraties = directoraties;
	}
public Section() {
	   
   }
	public Section(long sectionId, String sectionName, List<Directorate> directoraties) {
		this.sectionName = sectionName;
		this.directoraties = directoraties;
	
	}
	

	public long getSectionId() {
		return sectionId;
	}


	public void setSectionId(long sectionId) {
		this.sectionId = sectionId;
	}


	public String getSectionName() {
		return sectionName;
	}


	public void setSectionName(String sectionName) {
		this.sectionName = sectionName;
	}

	
}
	

