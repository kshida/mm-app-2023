import { useCallback, useEffect, useState } from "react";
import Particles from "react-particles";
import type { Engine } from "tsparticles-engine";
import { loadSlim } from "tsparticles-slim";
import { Player } from "textalive-app-api"
import './App.css'

const App = () => {
  const [player, setPlayer] = useState<Player | null>(null);
  const [songText, setSongText] = useState("")
  const [showControl, setShowControl] = useState(false)

  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  // 単語が発声されていたら #text に表示する
  const animateWord = (now: any, unit: any) => {
    if (unit.contains(now)) {
      setSongText(unit.text)
    }
  };

  const onPlay = () => {
    player?.requestPlay()
  }

  const onStop = () => {
    player?.requestPause()
  }

  useEffect(() => {
    const player = new Player({
      app: {
        token: import.meta.env.VITE_TEXT_ALIVE_TOKEN
      },
      mediaElement: "#media",
    });
    setPlayer(player)

    const playerListenr = {
      onAppReady: (app: any) => {
        // TextAlive ホストと接続されていなければ再生コントロールを表示する
        if (!app.managed) {
          // ネオンライトの海を往く / Ponchi♪ feat. 初音ミク
          player.createFromSongUrl("https://piapro.jp/t/fyxI/20230203003935", {
            video: {
              // 音楽地図訂正履歴: https://songle.jp/songs/2427951/history
              beatId: 4267373,
              chordId: 2405138,
              repetitiveSegmentId: 2475664,
              // 歌詞タイミング訂正履歴: https://textalive.jp/lyrics/piapro.jp%2Ft%2FfyxI%2F20230203003935
              lyricId: 56096,
              lyricDiffId: 9639
            },
          });
          setShowControl(true)
        }
      },
      // 動画オブジェクトの準備が整ったとき（楽曲に関する情報を読み込み終わったとき）に呼ばれる
      onVideoReady: () => {
        // 定期的に呼ばれる各単語の "animate" 関数をセットする
        let w = player.video.firstWord;
        while (w) {
          w.animate = animateWord;
          w = w.next;
        }
      },
    }
    player.addListener(playerListenr);
  }, [])

  return (
    <>
        <Particles
          id="tsparticles"
          init={particlesInit}
          options={{
              background: {
                  color: {
                      value: "#000000",
                  },
              },
              fpsLimit: 120,
              interactivity: {
                  events: {
                      onClick: {
                          enable: true,
                          mode: "push",
                      },
                      onHover: {
                          enable: true,
                          mode: "bubble",
                      },
                      resize: true,
                  },
                  modes: {
                    bubble: {
                      distance: 300,
                      duration: 5,
                      opacity: 1,
                      size: 30,
                      speed: 30,
                      color: {
                        value: ["#5bc0eb", "#fde74c", "#9bc53d", "#e55934", "#fa7921"]
                      }
                    },
                  },
                  push: {
                    quantity: 4,
                },
              },
              particles: {
                  color: {
                      value: "#40E0D0",
                      animation: {
                          count: 1,
                          enable: true,
                          speed: 60,
                          sync: true,
                      },
                  },
                  move: {
                      direction: "none",
                      enable: true,
                      outModes: {
                          default: "bounce",
                      },
                      random: false,
                      speed: 6,
                      straight: false,
                  },
                  number: {
                      density: {
                          enable: true,
                          area: 800,
                      },
                      value: 150,
                  },
                  opacity: {
                      value: 0.5,
                  },
                  shape: {
                      type: "circle",
                  },
                  size: {
                      value: { min: 3, max: 10 },
                  },
              },
              detectRetina: true,
          }}
        />
      <div id="container">
        {songText}
      </div>
      <div id="media"></div>
      <div id="footer">
        {showControl && (
        <div className="buttons">
          <button onClick={onPlay}>Play</button>
          <button onClick={onStop}>Pause</button>
        </div>
        )}
      </div>
    </>
  )
}

export default App
