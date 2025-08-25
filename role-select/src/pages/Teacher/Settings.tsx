// src/components/Settings.tsx
import { useState } from "react";
import { User, Bell, Lock, Palette, Shield, HelpCircle, ChevronRight, Camera, Save, Check } from "lucide-react";
import "./Settings.css";   // ✅ new CSS

interface NotificationSetting {
  id: string;
  title: string;
  description: string;
  email: boolean;
  push: boolean;
  sms: boolean;
}

export default function Settings() {
  const [activeTab, setActiveTab] = useState("profile");
  const [saved, setSaved] = useState(false);

  const tabs = [
    { id:"profile", name:"Profile", icon:User },
    { id:"notifications", name:"Notifications", icon:Bell },
    { id:"security", name:"Security", icon:Lock },
    { id:"preferences", name:"Preferences", icon:Palette },
    { id:"data", name:"Data & Privacy", icon:Shield },
    { id:"help", name:"Help & Support", icon:HelpCircle },
  ];

  const onSave = () => {
    setSaved(true);
    setTimeout(()=>setSaved(false), 3000);
  };

  return (
    <div className="settings-page">
      <header className="settings-header">
        <h1>Settings</h1>
        <p>Manage your account preferences and settings</p>
      </header>

      <div className="settings-layout">
        {/* Sidebar Tabs */}
        <aside className="settings-sidebar">
          {tabs.map(({id,name,icon:Icon})=>(
            <button key={id} 
              onClick={()=>setActiveTab(id)}
              className={`tab-btn ${activeTab===id?"active":""}`}>
              <Icon size={18}/> {name}
              <ChevronRight size={14} className="chevron"/>
            </button>
          ))}
        </aside>

        {/* Content area */}
        <section className="settings-content">
          {activeTab==="profile" && <ProfileSettings onSave={onSave}/>}
          {activeTab==="notifications" && <NotificationSettings onSave={onSave}/>}
          {/* … other tab components (Security, Preferences, etc.) */}
        </section>
      </div>

      {saved && 
        <div className="save-snackbar">
          <Check size={16}/> Settings saved successfully!
        </div>
      }
    </div>
  );
}

function ProfileSettings({onSave}:{onSave:()=>void}) {
  const [profile,setProfile] = useState({
    firstName:"Alex", lastName:"Smith", email:"alex.smith@school.edu",
    phone:"+27 12 345 6789", bio:"Passionate educator...", school:"Sunshine High", employeeId:"EMP001234"
  });

  return (
    <div>
      <h2 className="section-title">Profile Information</h2>
      <div className="avatar-section">
        <div className="avatar">AS</div>
        <button className="btn primary sm"><Camera size={14}/> Change Photo</button>
      </div>
      <form className="form-grid">
        <label>
          First Name
          <input value={profile.firstName} onChange={e=>setProfile({...profile,firstName:e.target.value})}/>
        </label>
        <label>
          Last Name
          <input value={profile.lastName} onChange={e=>setProfile({...profile,lastName:e.target.value})}/>
        </label>
        <label className="full">
          Email
          <input type="email" value={profile.email}/>
        </label>
        <label className="full">
          Bio
          <textarea rows={3} value={profile.bio}/>
        </label>
      </form>
      <button onClick={onSave} className="btn primary"><Save size={14}/> Save Changes</button>
    </div>
  )
}

function NotificationSettings({onSave}:{onSave:()=>void}) {
  const [notifications,setNotifications] = useState<NotificationSetting[]>([
    {id:"1",title:"Student Submissions",description:"When students submit work",email:true,push:true,sms:false}
  ]);
  return (
    <div>
      <h2 className="section-title">Notification Preferences</h2>
      {notifications.map(n=>(
        <div key={n.id} className="notif-row">
          <div><strong>{n.title}</strong><p>{n.description}</p></div>
          <div className="toggles">
            <label><input type="checkbox" checked={n.email}/> Email</label>
            <label><input type="checkbox" checked={n.push}/> Push</label>
            <label><input type="checkbox" checked={n.sms}/> SMS</label>
          </div>
        </div>
      ))}
      <button onClick={onSave} className="btn primary">Save</button>
    </div>
  )
}