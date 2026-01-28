import React from 'react';

function Toggle({ checked, onChange, label }) {
  return (
    <label className="toggle-switch" onClick={(e) => e.stopPropagation()}>
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange && onChange(e.target.checked)}
      />
      <span className="toggle-slider"></span>
      {label && <span style={{ marginLeft: 60 }}>{label}</span>}
    </label>
  );
}

export default Toggle;
