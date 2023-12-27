import { createSignal } from 'solid-js';

export default function Navbar() {
  const [isChecked, setIsChecked] = createSignal(false);

  return (
    <div class="nav-container">
      <p class="nav-header">
        AYO! IT'S PUVISH!
      </p>

      <div class="switch-container">
        <label class="switch">
          <input type="checkbox" checked={isChecked()} onChange={() => setIsChecked(!isChecked())} />
          <span class="slider"></span>
        </label>
      </div>
    </div>
  );
}