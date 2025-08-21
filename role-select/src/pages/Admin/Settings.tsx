import React, { useMemo, useState, type FormEvent } from "react";
import "./settings.css";

type Prefs = {
  language: "English" | "Zulu" | "Xhosa";
  timezone: string;
  emailNotifs: boolean;
  smsNotifs: boolean;
  productUpdates: boolean;
};

export default function Settings() {
  // seed email from login if you stored it
  const lastEmail = useMemo(() => localStorage.getItem("admin:last") || "admin@example.com", []);
  const [profile, setProfile] = useState({
    name: "Administrator",
    email: lastEmail,
    avatarUrl: "/admin.png", // /public/admin.png if present; else shows fallback
    newPassword: "",
    confirmPassword: "",
  });
  const [prefs, setPrefs] = useState<Prefs>({
    language: "English",
    timezone: "Africa/Johannesburg",
    emailNotifs: true,
    smsNotifs: false,
    productUpdates: true,
  });
  const [billing, setBilling] = useState({
    currency: "ZAR",
    invoiceEmail: lastEmail,
    taxNumber: "",
  });

  const [msg, setMsg] = useState<string | null>(null);
  function toast(text: string) {
    setMsg(text);
    setTimeout(() => setMsg(null), 2000);
  }

  function onAvatarPick(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setProfile((p) => ({ ...p, avatarUrl: url }));
  }

  function saveProfile(e: FormEvent) {
    e.preventDefault();
    if (profile.newPassword && profile.newPassword !== profile.confirmPassword) {
      toast("Passwords do not match.");
      return;
    }
    // TODO: send to API later
    localStorage.setItem("admin:last", profile.email);
    toast("Profile saved.");
  }

  function savePrefs(e: FormEvent) {
    e.preventDefault();
    // TODO: send to API later
    toast("Preferences saved.");
  }

  function saveBilling(e: FormEvent) {
    e.preventDefault();
    // TODO: send to API later
    toast("Billing settings saved.");
  }

  function deleteAccount() {
    // TODO: call API later
    alert("This would call your API to delete the account. For now it’s just a stub.");
  }

  return (
    <>
      <header className="content-header settings-header">
        <h1>System Settings</h1>
        {msg && <div className="flash">{msg}</div>}
      </header>

      <section className="settings-grid">
        {/* Profile */}
        <section className="card">
          <header className="hdr hdr-indigo">Profile</header>
          <form className="card-body padded form" onSubmit={saveProfile}>
            <div className="profile-row">
              <div className="avatar-wrap">
                {/* image preview + fallback circle */}
                {profile.avatarUrl ? (
                  <img
                    src={profile.avatarUrl}
                    alt="Avatar"
                    className="avatar-img"
                    onError={(e) => ((e.currentTarget.style.display = "none"))}
                  />
                ) : null}
                {!profile.avatarUrl && <div className="avatar-fallback">A</div>}
                <label className="btn small outline">
                  Change photo
                  <input type="file" accept="image/*" hidden onChange={onAvatarPick} />
                </label>
              </div>

              <div className="fields">
                <label className="label">Name</label>
                <input
                  className="input"
                  value={profile.name}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                />

                <label className="label">Email</label>
                <input
                  className="input"
                  type="email"
                  value={profile.email}
                  onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                />

                <div className="grid-2">
                  <div>
                    <label className="label">New Password</label>
                    <input
                      className="input"
                      type="password"
                      value={profile.newPassword}
                      onChange={(e) => setProfile({ ...profile, newPassword: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="label">Confirm Password</label>
                    <input
                      className="input"
                      type="password"
                      value={profile.confirmPassword}
                      onChange={(e) => setProfile({ ...profile, confirmPassword: e.target.value })}
                    />
                  </div>
                </div>

                <div className="actions">
                  <button className="btn primary" type="submit">Save changes</button>
                </div>
              </div>
            </div>
          </form>
        </section>

        {/* Preferences */}
        <section className="card">
          <header className="hdr hdr-teal">Preferences</header>
          <form className="card-body padded form" onSubmit={savePrefs}>
            <div className="grid-2">
              <div>
                <label className="label">Language</label>
                <select
                  className="input"
                  value={prefs.language}
                  onChange={(e) => setPrefs({ ...prefs, language: e.target.value as Prefs["language"] })}
                >
                  <option>English</option>
                  <option>Zulu</option>
                  <option>Xhosa</option>
                </select>
              </div>
              <div>
                <label className="label">Timezone</label>
                <input
                  className="input"
                  value={prefs.timezone}
                  onChange={(e) => setPrefs({ ...prefs, timezone: e.target.value })}
                  placeholder="Africa/Johannesburg"
                />
              </div>
            </div>

            <div className="switches">
              <Switch
                label="Email notifications"
                checked={prefs.emailNotifs}
                onChange={(v) => setPrefs({ ...prefs, emailNotifs: v })}
              />
              <Switch
                label="SMS notifications"
                checked={prefs.smsNotifs}
                onChange={(v) => setPrefs({ ...prefs, smsNotifs: v })}
              />
              <Switch
                label="Product updates"
                checked={prefs.productUpdates}
                onChange={(v) => setPrefs({ ...prefs, productUpdates: v })}
              />
            </div>

            <div className="actions">
              <button className="btn primary" type="submit">Save preferences</button>
            </div>
          </form>
        </section>

        {/* Billing */}
        <section className="card">
          <header className="hdr hdr-orange">Billing</header>
          <form className="card-body padded form" onSubmit={saveBilling}>
            <div className="grid-3">
              <div>
                <label className="label">Currency</label>
                <select
                  className="input"
                  value={billing.currency}
                  onChange={(e) => setBilling({ ...billing, currency: e.target.value })}
                >
                  <option value="ZAR">ZAR (R)</option>
                  <option value="USD">USD ($)</option>
                  <option value="EUR">EUR (€)</option>
                </select>
              </div>
              <div>
                <label className="label">Invoice Email</label>
                <input
                  className="input"
                  type="email"
                  value={billing.invoiceEmail}
                  onChange={(e) => setBilling({ ...billing, invoiceEmail: e.target.value })}
                />
              </div>
              <div>
                <label className="label">Tax Number</label>
                <input
                  className="input"
                  value={billing.taxNumber}
                  onChange={(e) => setBilling({ ...billing, taxNumber: e.target.value })}
                />
              </div>
            </div>

            <div className="actions">
              <button className="btn primary" type="submit">Save billing</button>
            </div>
          </form>
        </section>
      </section>

      {/* Danger Zone */}
      <section className="card danger-card">
        <header className="hdr hdr-danger">Danger Zone</header>
        <div className="card-body padded">
          <p>Delete your account and all associated data.</p>
          <button className="btn danger" onClick={deleteAccount}>Delete Account</button>
        </div>
      </section>
    </>
  );
}

/* --- tiny toggle switch component --- */
function Switch({ label, checked, onChange }: { label: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <label className="switch">
      <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} />
      <span className="track"><span className="thumb" /></span>
      <span className="switch-label">{label}</span>
    </label>
  );
}
