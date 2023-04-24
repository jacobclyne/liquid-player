import { requireNativeComponent, View } from 'react-native';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import resolveAssetSource from 'react-native/Libraries/Image/resolveAssetSource';

export default class LiquidPlayer extends Component {
    constructor(props, context) {
        super(props, context);
        this.seek = this.seek.bind(this);
        this.resume = this.resume.bind(this);
        this.snapshot = this.snapshot.bind(this);
        this._assignRoot = this._assignRoot.bind(this);
        this._onError = this._onError.bind(this);
        this._onProgress = this._onProgress.bind(this);
        this._onEnded = this._onEnded.bind(this);
        this._onPlaying = this._onPlaying.bind(this);
        this._onStopped = this._onStopped.bind(this);
        this._onPaused = this._onPaused.bind(this);
        this._onBuffering = this._onBuffering.bind(this);
        this._onOpen = this._onOpen.bind(this);
        this._onLoadStart = this._onLoadStart.bind(this);
        this.changeVideoAspectRatio = this.changeVideoAspectRatio.bind(this);
        this.subtitleTrack = this.subtitleTrack.bind(this);
        this.audioTrack = this.audioTrack.bind(this);
    }

    static defaultProps = {
        type: '',
        mainVer: 0,
        patchVer: 0,
        initType: 2,
        autoPlay: true,
        initOptions: [],
        progressUpdateInterval: 250,
    };

    setNativeProps(nativeProps) {
        this._root.setNativeProps(nativeProps);
    }

    seek(pos) {
        this.setNativeProps({ seek: pos });
    }

    subtitleTrack(track) {
        this.setNativeProps({ subtitleTrack: track });
    }

    audioTrack(track) {
        this.setNativeProps({ audioTrack: track });
    }

    resume(isResume) {
        this.setNativeProps({ resume: isResume });
    }

    snapshot(path) {
        this.setNativeProps({ snapshotPath: path });
    }

    autoAspectRatio(isAuto) {
        this.setNativeProps({ autoAspectRatio: isAuto });
    }

    changeVideoAspectRatio(ratio) {
        this.setNativeProps({ videoAspectRatio: ratio });
    }

    _assignRoot(component) {
        this._root = component;
    }

    _onBuffering(event) {
        if (this.props.onBuffering) {
            this.props.onBuffering(event.nativeEvent);
        }
    }

    _onError(event) {
        if (this.props.onError) {
            this.props.onError(event.nativeEvent);
        }
    }

    _onOpen(event) {
        if (this.props.onOpen) {
            this.props.onOpen(event.nativeEvent);
        }
    }

    _onLoadStart(event) {
        if (this.props.onLoadStart) {
            this.props.onLoadStart(event.nativeEvent);
        }
    }

    _onProgress(event) {
        if (this.props.onProgress) {
            this.props.onProgress(event.nativeEvent);
        }
    }

    _onEnded(event) {
        if (this.props.onEnd) {
            this.props.onEnd(event.nativeEvent);
        }
    }

    _onStopped() {
        this.setNativeProps({ paused: true });
        if (this.props.onStopped) {
            this.props.onStopped();
        }
    }

    _onPaused(event) {
        if (this.props.onPaused) {
            this.props.onPaused(event.nativeEvent);
        }
    }

    _onPlaying(event) {
        if (this.props.onPlaying) {
            this.props.onPlaying(event.nativeEvent);
        }
    }

    render() {
        const source = resolveAssetSource(this.props.source) || {};

        let uri = source.uri || '';

        if (uri && uri.match(/^\//)) {
            uri = `file://${uri}`;
        }

        const isAsset = !!(uri && uri.match(/^(assets-library|file|content|ms-appx|ms-appdata):/));

        const baseStyle = {
            overflow: 'hidden',
        };

        return (
            <RNLiquidPlayer
                source={{
                    isAsset,
                    initType: this.props.initType,
                    autoPlay: this.props.autoPlay,
                    userAgent: this.props.userAgent,
                    uri: this.props.source?.src || uri,
                    mediaOptions: this.props.mediaOptions,
                    type: source.type || this.props.type || '',
                    hwDecoderForced: this.props.hwDecoderForced,
                    hwDecoderEnabled: this.props.hwDecoderEnabled,
                    mainVer: source.mainVer || this.props.mainVer || 0,
                    patchVer: source.patchVer || this.props.patchVer || 0,
                    initOptions: source.initOptions || this.props.initOptions || [],
                    isNetwork: !!(uri && uri.match(/^https?:/)) || isAsset || !(uri && uri.match(/^\//)),
                }}
                ref={this._assignRoot}
                style={[baseStyle, this.props.style]}
                onVideoLoadStart={this._onLoadStart}
                onVideoOpen={this._onOpen}
                onVideoError={this._onError}
                onVideoProgress={this._onProgress}
                onVideoEnded={this._onEnded}
                onVideoEnd={this._onEnded}
                onVideoPlaying={this._onPlaying}
                onVideoPaused={this._onPaused}
                onVideoStopped={this._onStopped}
                onVideoBuffering={this._onBuffering}
                progressUpdateInterval={this.props.progressUpdateInterval}
                rate={this.props.rate}
                seek={this.props.seek}
                muted={this.props.muted}
                onEnd={this.props.onEnd}
                resume={this.props.resume}
                paused={this.props.paused}
                volume={this.props.volume}
                poster={this.props.poster}
                repeat={this.props.repeat}
                onOpen={this.props.onOpen}
                scaleX={this.props.scaleX}
                scaleY={this.props.scaleY}
                onEnded={this.props.onEnded}
                onError={this.props.onError}
                rotation={this.props.rotation}
                onPaused={this.props.onPaused}
                onPlaying={this.props.onPlaying}
                onStopped={this.props.onStopped}
                audioTrack={this.props.audioTrack}
                onProgress={this.props.onProgress}
                translateX={this.props.translateX}
                translateY={this.props.translateY}
                resizeMode={this.props.resizeMode}
                onBuffering={this.props.onBuffering}
                onLoadStart={this.props.onLoadStart}
                snapshotPath={this.props.snapshotPath}
                disableFocus={this.props.disableFocus}
                subtitleTrack={this.props.subtitleTrack}
                autoAspectRatio={this.props.autoAspectRatio}
                videoAspectRatio={this.props.videoAspectRatio}
                playInBackground={this.props.playInBackground}
                playWhenInactive={this.props.playWhenInactive}
            />
        );
    }
}

LiquidPlayer.propTypes = {
    rate: PropTypes.number,
    seek: PropTypes.number,
    subtitleTrack: PropTypes.number,
    audioTrack: PropTypes.number,
    resume: PropTypes.bool,
    snapshotPath: PropTypes.string,
    paused: PropTypes.bool,
    autoPlay: PropTypes.bool,
    autoAspectRatio: PropTypes.bool,
    videoAspectRatio: PropTypes.string,
    volume: PropTypes.number,
    disableFocus: PropTypes.bool,
    playInBackground: PropTypes.bool,
    playWhenInactive: PropTypes.bool,
    resizeMode: PropTypes.string,
    poster: PropTypes.string,
    repeat: PropTypes.bool,
    muted: PropTypes.bool,
    onVideoLoadStart: PropTypes.func,
    onVideoError: PropTypes.func,
    onVideoProgress: PropTypes.func,
    onVideoEnded: PropTypes.func,
    onVideoPlaying: PropTypes.func,
    onVideoPaused: PropTypes.func,
    onVideoStopped: PropTypes.func,
    onVideoBuffering: PropTypes.func,
    onVideoOpen: PropTypes.func,
    initOptions: PropTypes.arrayOf(PropTypes.string),
    source: PropTypes.oneOfType([PropTypes.shape({
        uri: PropTypes.string,
        src: PropTypes.string,
    }), PropTypes.number]),
    onError: PropTypes.func,
    onProgress: PropTypes.func,
    onEnded: PropTypes.func,
    onStopped: PropTypes.func,
    onPlaying: PropTypes.func,
    onPaused: PropTypes.func,
    onBuffering: PropTypes.func,
    onOpen: PropTypes.func,
    onLoadStart: PropTypes.func,
    onEnd: PropTypes.func,
    scaleX: PropTypes.number,
    scaleY: PropTypes.number,
    translateX: PropTypes.number,
    translateY: PropTypes.number,
    type: PropTypes.string,
    mainVer: PropTypes.number,
    patchVer: PropTypes.number,
    rotation: PropTypes.number,
    style: PropTypes.object,
    progressUpdateInterval: PropTypes.number,
    initType: PropTypes.number,
    mediaOptions: PropTypes.object,
    userAgent: PropTypes.string,
    hwDecoderEnabled: PropTypes.bool,
    hwDecoderForced: PropTypes.bool,
    ...View.propTypes,
};

const RNLiquidPlayer = requireNativeComponent('RCTVLCPlayer', LiquidPlayer);
