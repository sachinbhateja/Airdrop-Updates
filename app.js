const { createClient } = supabase;

const SUPABASE_URL = "https://gvtogwmmkqnudsgncxir.supabase.co";
const SUPABASE_KEY = "sb_publishable_-YZXJjuOzeGWBZ8GXu9fqg_nXymUyhX";

const client = createClient(SUPABASE_URL, SUPABASE_KEY);

async function loadUpdates() {
  const { data, error } = await client
    .from('Airdrops')   // IMPORTANT: matches your table name
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error("Error:", error);
    return;
  }

  const container = document.getElementById("updates");
  container.innerHTML = "";

  if (!data || data.length === 0) {
    container.innerHTML = "<p>No updates yet.</p>";
    return;
  }

  data.forEach(update => {
    container.innerHTML += `
      <div class="card">
        <h3>${update.project} (${update.source})</h3>
        <p>${update.content}</p>
        <small>${new Date(update.created_at).toLocaleString()}</small>
      </div>
    `;
  });
}

loadUpdates();
