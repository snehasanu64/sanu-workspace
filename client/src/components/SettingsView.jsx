import React from 'react';
import { User, Bell, Shield, Moon, Monitor } from 'lucide-react';

const SettingsView = () => {
  return (
    <div className="main-content">
      <h1 style={{ fontSize: '32px', marginBottom: '32px' }}>Settings</h1>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <SettingSection icon={<User size={20} />} title="Profile">
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '20px' }}>
            <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--accent-purple), var(--accent-blue))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', fontWeight: 'bold' }}>SW</div>
            <div>
              <h3 style={{ fontSize: '18px' }}>Sanu Workspace</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>sanu@workspace.com</p>
            </div>
            <button style={{ marginLeft: 'auto', background: 'rgba(255,255,255,0.05)', padding: '8px 16px', borderRadius: '8px', fontSize: '14px' }}>Edit Profile</button>
          </div>
        </SettingSection>

        <SettingSection icon={<Monitor size={20} />} title="Appearance">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <p style={{ fontSize: '16px', fontWeight: '500' }}>Dark Mode</p>
              <p style={{ color: 'var(--text-muted)', fontSize: '13px' }}>Midnight sanctuary theme</p>
            </div>
            <div style={{ width: '44px', height: '24px', borderRadius: '12px', background: 'var(--accent-green)', position: 'relative', cursor: 'pointer' }}>
              <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: 'white', position: 'absolute', right: '2px', top: '2px' }} />
            </div>
          </div>
        </SettingSection>

        <SettingSection icon={<Bell size={20} />} title="Notifications">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <p style={{ fontSize: '16px', fontWeight: '500' }}>Desktop Notifications</p>
            <div style={{ width: '44px', height: '24px', borderRadius: '12px', background: 'rgba(255,255,255,0.1)', position: 'relative', cursor: 'pointer' }}>
              <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: 'white', position: 'absolute', left: '2px', top: '2px' }} />
            </div>
          </div>
        </SettingSection>

      </div>
    </div>
  );
};

const SettingSection = ({ icon, title, children }) => (
  <div className="glass" style={{ padding: '24px', borderRadius: 'var(--radius-md)' }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px', color: 'var(--text-secondary)' }}>
      {icon}
      <h2 style={{ fontSize: '14px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{title}</h2>
    </div>
    {children}
  </div>
);

export default SettingsView;
