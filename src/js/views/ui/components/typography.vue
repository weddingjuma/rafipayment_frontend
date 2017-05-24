<template>
  <div>
    <h2>Typography</h2>
    <div class="grid">
      <div class="grid__col grid__col--1-of-2">
        <div class="box">
          <h1>Title h1</h1>
          <h2>Title h2</h2>
          <h3>Title h3</h3>
          <h4>Title h4</h4>
          <h5>Title h5</h5>
          <h6>Title h6</h6>
        </div>
      </div>
      <div class="grid__col grid__col--1-of-2">
        <div class="box">
          <p>
            <span>inline</span>
            <strong>bold</strong>
            <em>italic</em>
            <a href="#" @click.prevent>Link</a>
          </p>

          <p>This is a really awesome paragraph of text. It is the best paragraph of text you've ever seen, no doubt about it.</p>
          <ul>
            <li>List item</li>
            <li>List item</li>
            <li>List item</li>
            <li>List item</li>
            <li>List item</li>
          </ul>
          <ol>
            <li>List item 1</li>
            <li>List item 2</li>
            <li>List item 3</li>
            <li>List item 4</li>
            <li>List item 5</li>
          </ol>
        </div>
      </div>
    </div>
  </div>
</template>
