# Pigeon Motion Studio
Sepuluh komposisi Remotion bertema merpati. Setiap komposisi berdurasi 20 detik, 30 FPS, kanvas 3840x2160.

## Pasang ke GitHub
Upload seluruh isi folder ini ke root repository `pigeon-motion-studio`, termasuk folder `.github`.

## Render cloud
Buka Actions > Render pigeon video > Run workflow. Pilih PIGEON-001 sampai PIGEON-010. Download artifact `pigeon-video`.

Workflow default menghasilkan preview setengah resolusi agar lebih ringan. Untuk final 4K, hapus `--scale=0.5` dari perintah render; perhatikan batas waktu dan kuota GitHub Actions.
