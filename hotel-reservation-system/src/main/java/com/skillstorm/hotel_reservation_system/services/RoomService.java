package com.skillstorm.hotel_reservation_system.services;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.skillstorm.hotel_reservation_system.dtos.RoomDto;
import com.skillstorm.hotel_reservation_system.models.Room;
import com.skillstorm.hotel_reservation_system.repositories.RoomRepository;

/**
 * Service to connect the Room controller and repositories.
 */
@Service
public class RoomService {

    private final RoomRepository roomRepository;

    public RoomService(RoomRepository roomRepository) {
        this.roomRepository = roomRepository;
    }

    // Finds all rooms and returns them.
    public List<RoomDto> findAllRooms() {
        return roomRepository.findAll().stream()
                .map(room -> new RoomDto(
                        room.getId(),
                        room.getRoomDescription().getBedStyle(),
                        room.getRoomDescription().isAdaCompliant(),
                        room.getRoomDescription().isSmoking(),
                        room.getRoomDescription().getRoomImage(),
                        room.getRoomDescription().getMaxOccupancy(),
                        room.getRoomDescription().getPrice(),
                        room.getRoomDescription().getRoomColor()))
                .collect(Collectors.toList());
    }

    public Room createRoom(Room room) {
        return roomRepository.save(room);
    }

    // Accepts a LocalDate parameter and filters all rooms by if it is available on
    // that particular date.
    // This is useful for filtering by specific days.
    public List<RoomDto> findAllAvailableRooms(LocalDate date) {
        List<RoomDto> rooms = findAllRooms();
        // Will need a bookingService to find all rooms that are booked for this date.
        return rooms;
    }
}
