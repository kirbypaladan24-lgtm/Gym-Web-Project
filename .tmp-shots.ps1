$ErrorActionPreference = 'Stop'
$chrome = 'C:\Program Files\Google\Chrome\Application\chrome.exe'
$udd = 'C:\Users\user\AppData\Local\Temp\av-chrome-profile'
function Shoot($url, $out, $w, $h, $tag, $nw) {
  if (Test-Path $out) { Remove-Item $out -Force }
  if (Test-Path ($out + '.jpg')) { Remove-Item ($out + '.jpg') -Force }
  $ErrorActionPreference = 'Continue'
  $null = & $chrome --headless=new --disable-gpu --user-data-dir="$udd" --no-first-run --screenshot="$out" --window-size=$w,$h --hide-scrollbars --virtual-time-budget=9000 $url 2>&1
  $ErrorActionPreference = 'Stop'
  $deadline = (Get-Date).AddSeconds(30)
  $lastLen = -1; $stableSince = $null
  while ((Get-Date) -lt $deadline) {
    if (Test-Path $out) {
      $len = (Get-Item $out).Length
      if ($len -eq $lastLen -and $len -gt 0) {
        if ($null -eq $stableSince) { $stableSince = Get-Date }
        if (((Get-Date) - $stableSince).TotalMilliseconds -ge 1200) { break }
      } else { $stableSince = $null }
      $lastLen = $len
    }
    Start-Sleep -Milliseconds 300
  }
  if (-not (Test-Path $out)) { Write-Output ("SHOT-FAILED: " + $tag); return }
  Add-Type -AssemblyName System.Drawing
  $img = [System.Drawing.Image]::FromFile($out)
  $nh = [int]($img.Height * $nw / $img.Width)
  $bmp = New-Object System.Drawing.Bitmap($nw, $nh)
  $g = [System.Drawing.Graphics]::FromImage($bmp)
  $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
  $g.DrawImage($img, 0, 0, $nw, $nh)
  $g.Dispose()
  $img.Dispose()
  $jpg = $out + '.jpg'
  $codec = $null
  foreach ($c in [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders()) {
    if ($c.MimeType -eq 'image/jpeg') { $codec = $c }
  }
  $ep = New-Object System.Drawing.Imaging.EncoderParameters(1)
  $ep.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, [long]55)
  $bmp.Save($jpg, $codec, $ep)
  $bmp.Dispose()
  $bytes = [IO.File]::ReadAllBytes($jpg)
  Write-Output ("=== " + $tag + " JPEG-SIZE: " + $bytes.Length + " ===")
  Write-Output ("B64-" + $tag + "-BEGIN")
  Write-Output ([Convert]::ToBase64String($bytes))
  Write-Output ("B64-" + $tag + "-END")
}
Shoot 'http://localhost:3000/' 'C:\Users\user\AppData\Local\Temp\av-hero.png' 1280 900 'HERO' 520
Shoot 'http://localhost:3000/memberships' 'C:\Users\user\AppData\Local\Temp\av-memberships.png' 1280 3400 'MEMB' 520
Shoot 'http://localhost:3000/' 'C:\Users\user\AppData\Local\Temp\av-homefull.png' 1280 7600 'HOME' 440
Write-Output 'DONE-ALL'
