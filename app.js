document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    const tbody = document.querySelector('tbody');
    const statusDiv = document.querySelector('#status');

    function fetchBooks() {
        const formData = new FormData(form);
        const params = new URLSearchParams(formData);

        fetch(`books.php?${params.toString()}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(books => {
                const rows = [];

                books.forEach(book => {
                    const tr = document.createElement('tr');

                    const tdTitle = document.createElement('td');
                    tdTitle.textContent = book.title;
                    tr.appendChild(tdTitle);

                    const tdAuthor = document.createElement('td');
                    tdAuthor.textContent = book.author;
                    tr.appendChild(tdAuthor);

                    const tdYear = document.createElement('td');
                    tdYear.textContent = book.year;
                    tr.appendChild(tdYear);

                    const tdSubject = document.createElement('td');
                    tdSubject.textContent = book.subject;
                    tr.appendChild(tdSubject);

                    const tdShelf = document.createElement('td');
                    tdShelf.textContent = `${book.available} of ${book.copies}`;
                    if (book.available === 0 || book.available === '0') {
                        tdShelf.classList.add('out');
                    }
                    tr.appendChild(tdShelf);

                    rows.push(tr);
                });

                tbody.replaceChildren(...rows);

                if (books.length === 0) {
                    statusDiv.textContent = 'No books match your search.';
                } else if (books.length === 1) {
                    statusDiv.textContent = '1 book found.';
                } else {
                    statusDiv.textContent = `${books.length} books found.`;
                }
            })
            .catch(error => {
                console.error('Error fetching books:', error);
            });
    }

    fetch('subjects.php')
        .then(response => {
            if (!response.ok) throw new Error('Failed to load subjects');
            return response.json();
        })
        .then(subjects => {
            const subjectSelect = document.querySelector('#subject');
            subjects.forEach(subject => {
                const option = document.createElement('option');
                option.value = subject.id;
                option.textContent = subject.name;
                subjectSelect.appendChild(option);
            });
        })
        .catch(error => console.error('Error fetching subjects:', error));

  
    fetchBooks();

    form.addEventListener('submit', event => {
        event.preventDefault();
        fetchBooks();
    });
});