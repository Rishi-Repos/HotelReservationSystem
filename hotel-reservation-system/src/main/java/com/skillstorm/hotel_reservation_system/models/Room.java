package com.skillstorm.hotel_reservation_system.models;

import java.time.LocalDate;
import java.util.ArrayList;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

/**
 * Represents a physical room entity in a hotel.
 */

@Entity
public class Room {

    // Primary ID of the Room.
    @Id
    @Column(name = "room_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    // Many rooms may share the same room description.
    @ManyToOne
    @JoinColumn(name = "room_description_id")
    private RoomDescription roomDescription;

    public Room() {
    }

    public Room(long id, RoomDescription roomDescription) {
        this.id = id;
        this.roomDescription = roomDescription;
    }

    public Room(RoomDescription roomDescription) {
        this.roomDescription = roomDescription;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public RoomDescription getRoomDescription() {
        return roomDescription;
    }

    public void setRoomDescription(RoomDescription roomDescription) {
        this.roomDescription = roomDescription;
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + (int) (id ^ (id >>> 32));
        result = prime * result + ((roomDescription == null) ? 0 : roomDescription.hashCode());
        return result;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj)
            return true;
        if (obj == null)
            return false;
        if (getClass() != obj.getClass())
            return false;
        Room other = (Room) obj;
        if (id != other.id)
            return false;
        if (roomDescription == null) {
            if (other.roomDescription != null)
                return false;
        } else if (!roomDescription.equals(other.roomDescription))
            return false;
        return true;
    }

    @Override
    public String toString() {
        return "Room [id=" + id + ", roomDescription=" + roomDescription + "]";
    }
}
