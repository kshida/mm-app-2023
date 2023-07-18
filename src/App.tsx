import { useEffect, useState } from "react";
import { Player } from "textalive-app-api"
import MyParticles from './MyParticles'
import './App.css'

const App = () => {
    const [player, setPlayer] = useState<Player | null>(null);
    const [songText, setSongText] = useState("")
    const [showControl, setShowControl] = useState(false)
    const [showParticles, setShowParticles] = useState(false)

    // 単語が発声されていたら表示する
    const animateWord = (now: any, unit: any) => {
        if (unit.contains(now)) {
            setSongText(unit.text)
        }
    };

    const onPlay = () => {
        player?.requestPlay()
        setShowParticles(true)
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
            {showParticles ? (
                <>
                    <div id="header">
                        <div className="buttons">
                            <button onClick={onPlay}>Play</button>
                            <button onClick={onStop}>Pause</button>
                        </div>
                    </div>
                    <MyParticles />
                    <div id="container">
                        {songText}
                    </div>
                </>
            ) : ( 
                showControl && (
                    <div className="center">
                        <button onClick={onPlay}>Play</button>
                    </div>
                )
            )}
            <div id="media"></div>
        </>
    )
}

export default App
