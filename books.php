<?php
header('Content-Type: application/json; charset=UTF-8');
require_once __DIR__ . '/db.php';

$query = isset($_GET['q']) ? trim($_GET['q']) : '';

if ($query !== '') {
    $stmt = $pdo->prepare("SELECT id, title, author, year, subject_id, copies, on_loan FROM books WHERE title LIKE ? OR author LIKE ? ORDER BY title");
    $searchTerm = "%" . $query . "%";
    $stmt->execute([$searchTerm, $searchTerm]);
} else {
    $stmt = $pdo->query("SELECT id, title, author, year, subject_id, copies, on_loan FROM books ORDER BY title");
}

$books = $stmt->fetchAll(PDO::FETCH_ASSOC);
echo json_encode($books);