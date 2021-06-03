package com.payroll.payrollbackend.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "level")
public class Level {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long levelId;
	
	@Column
	private String levelName;
	
		
	public Level() {
		
	}

	public long getLevelId() {
		return levelId;
	}

	public void setLevelId(long levelId) {
		this.levelId = levelId;
	}

	public String getLevelName() {
		return levelName;
	}

	public void setLevelName(String levelName) {
		this.levelName = levelName;
	}

	public Level(String levelName) {
		super();
		this.levelName = levelName;
	}
	

}
