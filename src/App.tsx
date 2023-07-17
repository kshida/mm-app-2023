import { useCallback, useEffect, useState } from "react";
import Particles from "react-particles";
import type { Container, Engine } from "tsparticles-engine";
import { loadSlim } from "tsparticles-slim";
import { Player } from "textalive-app-api"
import './App.css'

const App = () => {
  const [player, setPlayer] = useState<Player | null>(null);
  const [songText, setSongText] = useState("")
  const [showControl, setShowControl] = useState(false)

  const particlesInit = useCallback(async (engine: Engine) => {
    console.log(engine);
    await loadSlim(engine);
}, []);

const particlesLoaded = useCallback(async (container: Container | undefined) => {
    await console.log(container);
}, []);

  // 単語が発声されていたら #text に表示する
  const animateWord = (now: any, unit: any) => {
    if (unit.contains(now)) {
      setSongText(unit.text)
    }
  };

  const onPlay = () => {
    console.log("onPlay")
    player?.requestPlay()
  }

  const onStop = () => {
    console.log("onStop")
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
        console.log("--- [app] initialized as TextAlive app ---");
        if (!app.managed) {
          console.log("managed:", app.managed);
          console.log("host:", app.host);
          console.log("song url:", app.songUrl);
          // 生きること / nogumi feat. 初音ミク
          player.createFromSongUrl("https://piapro.jp/t/fnhJ/20230131212038", {
            video: {
              beatId: 4267300,
              chordId: 2405033,
              repetitiveSegmentId: 2475606,
              lyricId: 56131,
              lyricDiffId: 9638
            },
          });
          setShowControl(true)
        }
      },
      // 動画オブジェクトの準備が整ったとき（楽曲に関する情報を読み込み終わったとき）に呼ばれる
      onVideoReady: (v: any) => {
        console.log("--- [app] video is ready ---");
        console.log("player:", player);
        console.log("player.data.song:", player.data.song);
        console.log("player.data.song.name:", player.data.song.name);
        console.log("player.data.song.artist.name:", player.data.song.artist.name);
        console.log("player.data.songMap:", player.data.songMap);
        // 定期的に呼ばれる各単語の "animate" 関数をセットする
        let w = player.video.firstWord;
        while (w) {
          w.animate = animateWord;
          w = w.next;
        }
      },
      onTimerReady() {
        console.log("--- [app] on timer is ready ---");
      },
      onPlay: () => console.log("再生開始"),
      onPause: () => console.log("再生一時停止"),
      onStop: () => console.log("再生終了（頭出し）"),
    }
    player.addListener(playerListenr);
  }, [])

  return (
    <>
        <Particles
          id="tsparticles"
          init={particlesInit}
          loaded={particlesLoaded}
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
      <div id="container" style={{ position: "fixed" }}>
        <div>
            {songText}
        </div>
      </div>
      <div id="media" style={{ position: "fixed" }}></div>
      <div id="footer" style={{marginTop: "20px", position: "fixed"}}>
        <div id="control" style={{display: showControl ? "block" : "none"}}>
          <button className="play" onClick={onPlay}>再生</button>
          <button id="pause" onClick={onStop}>一時停止</button>
        </div>
      </div>
    </>
  )
}

export default App
