<?php
// Database connection
$host = 'localhost';
$dbname = 'artisell';
$username = 'root';
$password = ''; // Default XAMPP password is empty

try {
    $db = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    // Set the PDO error mode to exception
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    // Set default fetch mode to associative array
    $db->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
} catch(PDOException $e) {
    // If database doesn't exist yet, create it
    if ($e->getCode() == 1049) { // 1049 is the error code for "Unknown database"
        try {
            $tempDb = new PDO("mysql:host=$host", $username, $password);
            $tempDb->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            
            // Create database
            $tempDb->exec("CREATE DATABASE IF NOT EXISTS $dbname");
            $tempDb = null; // Close connection
            
            // Connect to the newly created database
            $db = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
            $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $db->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
            
            // Create tables
            include 'setup_database.php';
        } catch(PDOException $e) {
            die("ERROR: Could not connect. " . $e->getMessage());
        }
    } else {
        die("ERROR: Could not connect. " . $e->getMessage());
    }
}
?>