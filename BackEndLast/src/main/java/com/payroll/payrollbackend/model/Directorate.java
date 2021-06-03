package com.payroll.payrollbackend.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "Directorate")
public class Directorate {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long directorateId;
	
	@Column(name = "directorateName")
	private String directorateName;
	
	@ManyToOne
	@JoinColumn(name = "sectionId")
    	private Section section;

	public long getDirectorateId() {
		return directorateId;
	}

	public Directorate(long directorateId, String directorateName, Section section) {
		this.directorateName = directorateName;
		this.section = section;
	}

	public Directorate() {
	}

	public void setDirectorateId(long directorateId) {
		this.directorateId = directorateId;
	}

	public String getDirectorateName() {
		return directorateName;
	}

	public void setDirectorateName(String directorateName) {
		this.directorateName = directorateName;
	}

	public Section getSection() {
		return section;
	}

	public void setSection(Section section) {
		this.section = section;
	}
	
}