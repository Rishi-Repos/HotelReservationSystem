package com.skillstorm.hotel_reservation_system.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.skillstorm.hotel_reservation_system.models.RoomDescription;

@Repository
public interface RoomDescriptionRepository extends JpaRepository<RoomDescription, Integer> {

}
