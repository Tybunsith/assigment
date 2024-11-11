<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Country Catalog</title>
  <link rel="stylesheet" href="{{ asset('style.css') }}">
  <link href="https://stackpath.bootstrapcdn.com/bootstrap/5.3.0/css/bootstrap.min.css" rel="stylesheet">


</head>
<body>
  <header>
    <h1>Country Catalog</h1>
    <div class="controls">
      <input type="text" id="search" placeholder="Search by Country Name">
      <select id="sort">
        <option value="asc">Sort by Name (Asc)</option>
        <option value="desc">Sort by Name (Desc)</option>
      </select>
    </div>
  </header>
  <main>
    <div id="catalog"></div>
    <div class="pagination">
      <button id="prevPage" disabled>Previous</button>
      <span id="pageInfo"></span>
      <button id="nextPage">Next</button>
    </div>
  </main>
  <div id="countryModal" class="modal">
    <div class="modal-content">
      <span class="close">&times;</span>
      <div id="countryDetails"></div>
    </div>
  </div>
  <script src="{{ asset('script.js') }}"></script>
</body>
</html>
