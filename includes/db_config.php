<?php
// Database configuration for phpMyAdmin
$host = 'localhost';
$user = 'root';
$password = '';
$database = 'artisell_db';

// Create connection
$conn = new mysqli($host, $user, $password, $database);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Set character set
$conn->set_charset("utf8mb4");
