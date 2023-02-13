@extends('srs_social/layout')
@section('content')

<?php

// Connect to the database server
$conn = mysqli_connect('mysql', 'root', 'password', 'portfolio');

// Check connection
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

// Define the query
$sql = "SELECT name FROM users";

// Execute the query
$result = mysqli_query($conn, $sql);

// Check for results
if (mysqli_num_rows($result) > 0) {
    // Output the data for each row
    while($row = mysqli_fetch_assoc($result)) {
        echo "Name: " . $row["name"] . "<br>";
    }
} else {
    echo "0 results";
}

// Close the connection
mysqli_close($conn);

?>


@endsection