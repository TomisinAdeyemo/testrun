  // Button event listeners
  document.getElementById("dashboard-btn").addEventListener("click", function () {
    document.querySelectorAll(".content-section").forEach(function (section) {
      section.style.display = "none";
    });
    document.getElementById("dashboard-section").style.display = "block";
  });

  document.getElementById("users-btn").addEventListener("click", function () {
    document.querySelectorAll(".content-section").forEach(function (section) {
      section.style.display = "none";
    });
    document.getElementById("users-section").style.display = "block";
  });

  document.getElementById("earnings-btn").addEventListener("click", function () {
    document.querySelectorAll(".content-section").forEach(function (section) {
      section.style.display = "none";
    });
    document.getElementById("earnings-section").style.display = "block";
  });



  document.getElementById("expense-btn").addEventListener("click", function () {
    document.querySelectorAll(".content-section").forEach(function (section) {
      section.style.display = "none";
    });
    document.getElementById("expense-section").style.display = "block";
  });

  document.getElementById("email-btn").addEventListener("click", function () {
    document.querySelectorAll(".content-section").forEach(function (section) {
      section.style.display = "none";
    });
    document.getElementById("email-section").style.display = "block";
  });

  document.getElementById("report-btn").addEventListener("click", function () {
    document.querySelectorAll(".content-section").forEach(function (section) {
      section.style.display = "none";
    });
    document.getElementById("report-section").style.display = "block";
  });

  //USER DATA ENTRY
  document.addEventListener("DOMContentLoaded", () => {
    const apiUrl = "https://api.example.com/users"; // Replace with your actual API endpoint
    const tableBody = document.getElementById("user-table-body");

    // Fetch user data from the API
    async function fetchUserData() {
      try {
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error("Network response was not ok");
        const users = await response.json();
        populateTable(users);
      } catch (error) {
        console.error("Error fetching user data:", error);
        tableBody.innerHTML = `<tr><td colspan="7">Failed to load user data.</td></tr>`;
      }
    }

    // Populate the table with user data
    function populateTable(users) {
      tableBody.innerHTML = ""; // Clear existing rows
      users.forEach((user) => {
        const row = document.createElement("tr");

        row.innerHTML = `
          <td>${user.name}</td>
          <td>${user.email}</td>
          <td>${user.mobile}</td>
          <td>${user.package}</td>
          <td>${user.lifespan}</td>
          <td>${user.status}</td>
          <td><button class="view-details" onclick="viewDetails('${user.id}')">View Details</button></td>
        `;
        tableBody.appendChild(row);
      });
    }

    // Handle "View Details" button click
    window.viewDetails = (userId) => {
      alert(`Details for User ID: ${userId}`);
      // Implement further functionality as needed
    };

    // Fetch user data on page load
    fetchUserData();
  });

  // Data for the chart
  const chartData = {
    week: [2000, 3000, 5000, 4000, 2500, 3200, 4500],
    month: [10000, 15000, 20000, 25000, 30000, 35000, 40000, 45000],
    year: [5000, 7000, 8000, 20000, 25000, 30000, 40000, 50000, 45000, 30000, 20000, 10000]
  };

  const ctx = document.getElementById("line-chart").getContext("2d");
  const chart = new Chart(ctx, {
    type: "line",
    data: {
      labels: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
      datasets: [{
        label: "Revenue",
        data: chartData.year,
        borderColor: "#008cba",
        fill: false,
        tension: 0.1
      }]
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
          max: 50000
        },
        x: {
          grid: {
            display: false
          }
        }
      }
    }
  });

  // Function to change chart data dynamically
  function changeChart(period) {
    document.querySelectorAll(".toggle-option").forEach(button => button.classList.remove("active"));
    document.querySelector(`.toggle-option[onclick="changeChart('${period}')"]`).classList.add("active");

    chart.data.datasets[0].data = chartData[period];
    chart.update();
  }

