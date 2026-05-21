const screens = [
  { id: "home", label: "Home", title: "Home" },
  { id: "login", label: "Login", title: "Login" },
  { id: "lists", label: "Lists", title: "Shopping Lists" },
  { id: "editor", label: "List Editor", title: "List Editor" },
  { id: "products", label: "Products", title: "Products" },
  { id: "context", label: "Context", title: "Shopping Context" },
  { id: "physical", label: "Physical Shopping", title: "Physical Shopping" },
  { id: "layout", label: "Layout", title: "Supermarket Layout" },
  { id: "online", label: "Online Shopping", title: "Online Shopping" },
  { id: "history", label: "History", title: "History" },
  { id: "account", label: "Account", title: "Account And Privacy" },
];

const templates = {
  home: `
    <div class="grid">
      <section class="panel span-8">
        <h2>Shopping command center</h2>
        <p class="muted">Authenticated users land here with reusable lists, recent sessions, supermarkets, online contexts, and spend summaries.</p>
        <div class="actions">
          <button class="button primary" data-go="lists">Create list</button>
          <button class="button" data-go="lists">Duplicate list</button>
          <button class="button" data-go="context">Start shopping</button>
          <button class="button" data-go="products">Products</button>
          <button class="button" data-go="history">History</button>
        </div>
      </section>
      <section class="panel span-4">
        <h2>Recent spend</h2>
        <ul class="list">
          <li class="row"><div><strong>Weekly shopping</strong><span>Estimated $78.40 / actual $82.10</span></div><span class="tag ok">completed</span></li>
          <li class="row"><div><strong>Online refill</strong><span>Marketplace source label saved</span></div><span class="tag neutral">online</span></li>
        </ul>
      </section>
      <section class="panel span-12">
        <h2>Active reusable lists</h2>
        <div class="table-wrap">
          <table>
            <thead><tr><th>List</th><th>Items</th><th>Last used</th><th>Primary action</th></tr></thead>
            <tbody>
              <tr><td>Weekly shopping</td><td>18</td><td>May 18, 2026</td><td><button class="button" data-go="context">Start shopping</button></td></tr>
              <tr><td>Barbecue</td><td>9</td><td>May 11, 2026</td><td><button class="button" data-go="editor">Edit list</button></td></tr>
              <tr><td>Monthly basics</td><td>24</td><td>Apr 29, 2026</td><td><button class="button" data-go="lists">Duplicate</button></td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  `,
  login: `
    <div class="grid">
      <section class="panel span-6">
        <h2>Welcome and login</h2>
        <p class="muted">Authentication options are visible before private shopping data loads.</p>
        <div class="list">
          <button class="button primary">Continue with Google</button>
          <button class="button">Continue with Microsoft</button>
        </div>
        <hr>
        <div class="form-grid">
          <label>E-mail address<input value="user@example.com"></label>
          <label>Password<input type="password" value="password"></label>
        </div>
        <div class="actions">
          <button class="button primary" data-go="home">Sign in with e-mail</button>
          <button class="button">Create account</button>
          <button class="button">Recover password</button>
        </div>
      </section>
      <section class="panel span-6">
        <h2>Recoverable states</h2>
        <ul class="list">
          <li class="row"><div><strong>Social login failed</strong><span>Google or Microsoft returns to login without clearing form context.</span></div><span class="tag danger">error</span></li>
          <li class="row"><div><strong>Native sign-in failed</strong><span>Invalid e-mail or password shows inline validation.</span></div><span class="tag danger">error</span></li>
          <li class="row"><div><strong>Location permission later</strong><span>Location is requested only when physical shopping starts.</span></div><span class="tag neutral">deferred</span></li>
        </ul>
      </section>
    </div>
  `,
  lists: `
    <div class="grid">
      <section class="panel span-12">
        <h2>Reusable lists</h2>
        <div class="actions">
          <button class="button primary" data-go="editor">Create list</button>
          <button class="button">Duplicate selected</button>
          <button class="button" data-go="context">Start shopping</button>
          <button class="button danger">Archive</button>
        </div>
      </section>
      <section class="panel span-12">
        <div class="table-wrap">
          <table>
            <thead><tr><th>List</th><th>Status</th><th>Items</th><th>Last updated</th><th>Actions</th></tr></thead>
            <tbody>
              <tr><td>Weekly shopping</td><td><span class="tag ok">active</span></td><td>18</td><td>May 20, 2026</td><td>Create duplicate / Edit / Start shopping</td></tr>
              <tr><td>Barbecue - copy</td><td><span class="tag ok">active</span></td><td>9</td><td>May 19, 2026</td><td>Independent duplicate can be changed safely</td></tr>
              <tr><td>Holiday dinner</td><td><span class="tag neutral">archived</span></td><td>12</td><td>Dec 28, 2025</td><td>Restore / Delete</td></tr>
            </tbody>
          </table>
        </div>
      </section>
      <section class="panel span-12 subtle">
        <p class="note">Starting a session requires exactly one selected list. Completing shopping never empties or destroys the reusable source list.</p>
      </section>
    </div>
  `,
  editor: `
    <div class="grid">
      <section class="panel span-5">
        <h2>List details</h2>
        <div class="form-grid">
          <label>List name<input value="Weekly shopping"></label>
          <label>Description<input value="Reusable household basics"></label>
        </div>
        <div class="actions">
          <button class="button primary">Save list</button>
          <button class="button">Duplicate list</button>
          <button class="button" data-go="context">Start shopping</button>
        </div>
      </section>
      <section class="panel span-7">
        <h2>Add product</h2>
        <div class="form-grid">
          <label>Product<input value="Rice"></label>
          <label>Quantity<input value="2"></label>
          <label>Unit<select><option>kg</option><option>unit</option><option>liter</option><option>package</option></select></label>
          <label>Expected price<input value="$7.80"></label>
          <label>Priority<select><option>normal</option><option>high</option><option>low</option></select></label>
          <label>Notes<input value="Prefer long grain"></label>
        </div>
      </section>
      <section class="panel span-12">
        <h2>Items with quantity, unit, and expected price</h2>
        <div class="table-wrap">
          <table>
            <thead><tr><th>Order</th><th>Product</th><th>Category</th><th>Quantity</th><th>Unit</th><th>Expected price</th><th>Notes</th></tr></thead>
            <tbody>
              <tr><td>1</td><td>Rice</td><td>Pantry</td><td>2</td><td>kg</td><td>$7.80</td><td>Long grain</td></tr>
              <tr><td>2</td><td>Milk</td><td>Dairy</td><td>3</td><td>liter</td><td>$4.50</td><td>Whole milk</td></tr>
              <tr><td>3</td><td>Tomatoes</td><td>Produce</td><td>1.5</td><td>kg</td><td>$5.20</td><td>Ripe</td></tr>
              <tr><td>4</td><td>Eggs</td><td>Dairy</td><td>1</td><td>dozen</td><td>$6.10</td><td>Large</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  `,
  products: `
    <div class="grid">
      <section class="panel span-4">
        <h2>Product form</h2>
        <label>Name<input value="Coffee"></label>
        <label>Category<input value="Pantry"></label>
        <label>Brand<input value="Any preferred brand"></label>
        <label>Default unit<select><option>package</option><option>kg</option><option>unit</option><option>bottle</option></select></label>
        <label>Estimated price<input value="$12.90"></label>
        <label>Notes<textarea>Used for list suggestions and price planning only.</textarea></label>
        <button class="button primary">Save product</button>
      </section>
      <section class="panel span-8">
        <h2>Catalog</h2>
        <div class="filters">
          <input aria-label="Search products" value="Search: dairy, pantry, produce">
          <button class="button">Filter category</button>
          <button class="button">Create product</button>
        </div>
        <div class="table-wrap">
          <table>
            <thead><tr><th>Product</th><th>Category</th><th>Default unit</th><th>Estimated price</th><th>History</th></tr></thead>
            <tbody>
              <tr><td>Milk</td><td>Dairy</td><td>liter</td><td>$1.50</td><td>Latest actual $1.58</td></tr>
              <tr><td>Coffee</td><td>Pantry</td><td>package</td><td>$12.90</td><td>Range $10.90-$13.40</td></tr>
              <tr><td>Tomatoes</td><td>Produce</td><td>kg</td><td>$5.20</td><td>Archived products remain in history</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  `,
  context: `
    <div class="grid">
      <section class="panel span-6">
        <h2>Selected list</h2>
        <p><strong>Weekly shopping</strong></p>
        <p class="muted">18 items, estimated total $78.40. One list is used for this shopping session.</p>
        <div class="wire-box">Session setup preview: source list snapshot will be saved before outcomes are recorded.</div>
      </section>
      <section class="panel span-6">
        <h2>Choose context</h2>
        <ul class="list">
          <li class="row"><div><strong>Physical supermarket</strong><span>Requests geolocation, then confirms the supermarket before layout data is recorded.</span></div><button class="button primary" data-go="physical">Continue</button></li>
          <li class="row"><div><strong>Online shopping</strong><span>Skips geolocation and skips physical layout. Requires online source label before finish.</span></div><button class="button" data-go="online">Continue</button></li>
        </ul>
        <p class="note">If location is denied, unavailable, imprecise, or ambiguous, the physical flow asks the user to choose an existing supermarket, create one, or cancel.</p>
      </section>
    </div>
  `,
  physical: `
    <div class="grid">
      <section class="panel span-12">
        <h2>Physical session at Mercado Central</h2>
        <p class="muted">Geolocation identified candidates; the user confirmed Mercado Central before layout contributions were allowed.</p>
        <div class="actions">
          <span class="tag ok">store confirmed</span>
          <span class="tag neutral">shared layout consent checked</span>
          <button class="button" data-go="layout">Open layout</button>
          <button class="button primary">Finish session</button>
        </div>
      </section>
      <section class="panel span-12">
        <h2>Active items</h2>
        <div class="table-wrap">
          <table>
            <thead><tr><th>Product</th><th>Quantity</th><th>Unit</th><th>Expected</th><th>Actual price</th><th>Outcome</th><th>Product location</th></tr></thead>
            <tbody>
              <tr><td>Rice</td><td>2</td><td>kg</td><td>$7.80</td><td>$8.10</td><td><span class="outcome bought">bought</span></td><td>Aisle 3, lower shelf</td></tr>
              <tr><td>Coffee</td><td>1</td><td>package</td><td>$12.90</td><td>-</td><td><span class="outcome missing">not found</span></td><td>Pantry aisle suggested, unconfirmed</td></tr>
              <tr><td>Milk</td><td>3</td><td>liter</td><td>$4.50</td><td>-</td><td><span class="outcome pending">pending</span></td><td>Dairy sector, fridge wall</td></tr>
            </tbody>
          </table>
        </div>
      </section>
      <section class="panel span-6">
        <h2>Location form</h2>
        <div class="form-grid">
          <label>Sector<input value="Dairy"></label>
          <label>Aisle<input value="Back wall"></label>
          <label>Shelf or label<input value="Fridge, middle shelf"></label>
          <label>Visibility<select><option>Private adjustment</option><option>Shared contribution</option></select></label>
        </div>
      </section>
      <section class="panel span-6">
        <h2>Exception states</h2>
        <ul class="list">
          <li class="row"><div><strong>Bought without price informed</strong><span>Allowed, but shown in history without actual price.</span></div><span class="tag pending">warning</span></li>
          <li class="row"><div><strong>Finish with pending items</strong><span>Requires confirmation; pending outcome is preserved.</span></div><span class="tag pending">confirm</span></li>
          <li class="row"><div><strong>Moved away from store</strong><span>Warns before recording more layout updates.</span></div><span class="tag danger">location</span></li>
        </ul>
      </section>
    </div>
  `,
  layout: `
    <div class="grid">
      <section class="panel span-12">
        <h2>Shared layout plus private adjustments</h2>
        <p class="muted">Physical supermarket layout is approximate and user-assisted. Online shopping never updates this surface.</p>
      </section>
      <section class="panel span-8">
        <div class="layout-map">
          <div class="aisle"><strong>Produce</strong><span class="tag ok">shared</span><p>Tomatoes: front tables, last confirmed May 18.</p></div>
          <div class="aisle"><strong>Pantry</strong><span class="tag pending">uncertain</span><p>Rice: aisle 3. Coffee confidence low.</p></div>
          <div class="aisle"><strong>Dairy</strong><span class="tag ok">shared</span><p>Milk: fridge wall, middle shelf.</p></div>
          <div class="aisle"><strong>Private notes</strong><span class="tag neutral">only you</span><p>Coffee moved near checkout in this store.</p></div>
        </div>
      </section>
      <section class="panel span-4">
        <h2>Controls</h2>
        <label>Select supermarket<select><option>Mercado Central</option><option>North Market</option></select></label>
        <label>Search product or category<input value="coffee"></label>
        <div class="actions">
          <button class="button primary">Add private adjustment</button>
          <button class="button">Contribute shared suggestion</button>
        </div>
        <p class="note">Shared contribution is disabled unless the user has granted separate consent. Private adjustments remain available.</p>
      </section>
    </div>
  `,
  online: `
    <div class="grid">
      <section class="panel span-5">
        <h2>Online context</h2>
        <label>Online source label<input value="FreshNow app"></label>
        <label>Context type<select><option>App</option><option>Website</option><option>Marketplace</option><option>Delivery service</option></select></label>
        <label>Notes<textarea>Delivery scheduled for tonight.</textarea></label>
        <p class="note">Online shopping skips geolocation and skips physical supermarket layout.</p>
      </section>
      <section class="panel span-7">
        <h2>Online items</h2>
        <div class="table-wrap">
          <table>
            <thead><tr><th>Product</th><th>Quantity</th><th>Unit</th><th>Expected</th><th>Price</th><th>Outcome</th></tr></thead>
            <tbody>
              <tr><td>Milk</td><td>3</td><td>liter</td><td>$4.50</td><td>$4.74</td><td><span class="outcome bought">bought</span></td></tr>
              <tr><td>Coffee</td><td>1</td><td>package</td><td>$12.90</td><td>-</td><td><span class="outcome unavailable">unavailable</span></td></tr>
              <tr><td>Rice</td><td>2</td><td>kg</td><td>$7.80</td><td>-</td><td><span class="outcome pending">pending</span></td></tr>
            </tbody>
          </table>
        </div>
        <div class="actions">
          <button class="button primary">Finish online session</button>
          <button class="button">Confirm pending items</button>
        </div>
      </section>
    </div>
  `,
  history: `
    <div class="grid">
      <section class="panel span-12">
        <h2>History filters</h2>
        <div class="filters">
          <input aria-label="Product filter" value="Product: milk">
          <input aria-label="Store or online filter" value="Store or online: Mercado Central / FreshNow app">
          <input aria-label="Date range" value="Date: May 2026">
          <button class="button">Filter by source list snapshot</button>
        </div>
      </section>
      <section class="panel span-12">
        <h2>Immutable session item snapshots</h2>
        <div class="table-wrap">
          <table>
            <thead><tr><th>Product</th><th>Store or online</th><th>Date</th><th>Quantity</th><th>Unit</th><th>Actual price</th><th>Outcome</th><th>Source list snapshot</th></tr></thead>
            <tbody>
              <tr><td>Milk</td><td>Mercado Central</td><td>May 18, 2026</td><td>3</td><td>liter</td><td>$4.74</td><td><span class="outcome bought">bought</span></td><td>Weekly shopping</td></tr>
              <tr><td>Coffee</td><td>Mercado Central</td><td>May 18, 2026</td><td>1</td><td>package</td><td>-</td><td><span class="outcome missing">not found</span></td><td>Weekly shopping</td></tr>
              <tr><td>Rice</td><td>FreshNow app</td><td>May 20, 2026</td><td>2</td><td>kg</td><td>-</td><td><span class="outcome pending">pending</span></td><td>Online refill copy</td></tr>
            </tbody>
          </table>
        </div>
      </section>
      <section class="panel span-12 subtle">
        <p class="note">History remains accurate if reusable products or lists are renamed, edited, archived, deleted, or duplicated after the session.</p>
      </section>
    </div>
  `,
  account: `
    <div class="grid">
      <section class="panel span-5">
        <h2>Account</h2>
        <label>Name<input value="ZBuy User"></label>
        <label>E-mail<input value="user@example.com"></label>
        <ul class="list">
          <li class="row"><div><strong>Google</strong><span>Linked authentication method</span></div><span class="tag ok">linked</span></li>
          <li class="row"><div><strong>Microsoft</strong><span>Available to link</span></div><span class="tag neutral">optional</span></li>
          <li class="row"><div><strong>Native e-mail</strong><span>Password can be changed</span></div><span class="tag ok">active</span></li>
        </ul>
      </section>
      <section class="panel span-7">
        <h2>Privacy controls</h2>
        <ul class="list">
          <li class="row"><div><strong>Location consent</strong><span>Required before geolocation is requested for physical shopping.</span></div><span class="tag pending">ask in context</span></li>
          <li class="row"><div><strong>Shared layout contribution consent</strong><span>Required before private observations can improve shared layout suggestions.</span></div><span class="tag neutral">off</span></li>
          <li class="row"><div><strong>Private history</strong><span>Purchase history, actual prices, quantities, units, and outcomes are private by default.</span></div><span class="tag ok">private</span></li>
          <li class="row"><div><strong>Private layout adjustments</strong><span>Kept visible only to the owner even when shared contribution is disabled.</span></div><span class="tag ok">private</span></li>
        </ul>
        <div class="actions">
          <button class="button">Export account data</button>
          <button class="button danger">Delete account</button>
        </div>
      </section>
    </div>
  `,
};

const nav = document.querySelector("#nav");
const app = document.querySelector("#app");
const title = document.querySelector("#screen-title");

function renderNav(activeId) {
  nav.innerHTML = screens
    .map((screen) => `<button type="button" data-go="${screen.id}" class="${screen.id === activeId ? "active" : ""}">${screen.label}</button>`)
    .join("");
}

function renderScreen(screenId) {
  const screen = screens.find((item) => item.id === screenId) || screens[0];
  title.textContent = screen.title;
  app.innerHTML = templates[screen.id];
  renderNav(screen.id);
  window.location.hash = screen.id;
}

document.addEventListener("click", (event) => {
  const button = event.target.closest("[data-go]");
  if (!button) return;
  renderScreen(button.dataset.go);
});

window.addEventListener("hashchange", () => {
  const id = window.location.hash.replace("#", "");
  renderScreen(id || "home");
});

renderScreen(window.location.hash.replace("#", "") || "home");
