<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Input Tanggal dan Jam</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <!-- Tombol untuk mengaktifkan/menonaktifkan mode gelap -->
    <button class="dark-mode-toggle" onclick="toggleDarkMode()">Dark Mode</button>

    <h2>Masukkan Tanggal dan Jam</h2>
    <form action="simpan.php" method="post">
        <label for="tanggal">Tanggal:</label>
        <input type="date" id="tanggal" name="tanggal"><br>

        <label for="jam">Jam:</label>
        <input type="time" id="jam" name="jam"><br>

        <input type="submit" value="Submit">
    </form>

    <!-- Button to log data -->
    <button class="log-button" onclick="showTable()">Log</button>

    <!-- Table container -->
    <div class="table-container" id="tableContainer" style="display: none;">
        <table>
            <thead>
                <tr>
                    <th>Tanggal</th>
                    <th>Jam</th>
                </tr>
            </thead>
            <tbody>
            <?php
                // Include database connection
                include 'koneksi.php';

                // Query untuk mengambil data dari database
                $sql = "SELECT tanggal, jam FROM timer";
                $result = $conn->query($sql);

                // Tampilkan data jika ada hasil
                if ($result->num_rows > 0) {
                    while ($row = $result->fetch_assoc()) {
                        echo "<tr>
                                <td>" . $row["tanggal"] . "</td>
                                <td>" . $row["jam"] . "</td>
                              </tr>";
                    }
                } else {
                    echo "<tr><td colspan='3'>Tidak ada data</td></tr>";
                }

                // Tutup koneksi database
                $conn->close();
                ?>
            </tbody>
        </table>
    </div>

    <script>
        // Function to show the table
        function showTable() {
            const tableContainer = document.getElementById('tableContainer');
            tableContainer.style.display = tableContainer.style.display === 'none' ? 'block' : 'none';
        }

        // Function for dark mode
        function toggleDarkMode() {
            document.body.classList.toggle("dark-mode");
        }
    </script>
</body>
</html>
