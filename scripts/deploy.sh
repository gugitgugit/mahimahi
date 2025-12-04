#!/bin/bash

# EC2 배포 스크립트
# 사용법: ./scripts/deploy.sh

set -e  # 에러 발생 시 스크립트 중단

echo "🚀 배포를 시작합니다..."

# 프로젝트 루트 디렉토리 확인
if [ ! -f "package.json" ]; then
    echo "❌ 오류: package.json을 찾을 수 없습니다. 프로젝트 루트에서 실행해주세요."
    exit 1
fi

# Git 저장소에서 최신 코드 가져오기
if [ -d ".git" ]; then
    echo "📥 GitHub에서 최신 코드 가져오는 중..."
    git pull
else
    echo "⚠️  경고: Git 저장소가 아닙니다. 코드 업데이트를 건너뜁니다."
fi

# 환경변수 파일 확인
if [ ! -f ".env" ]; then
    echo "⚠️  경고: .env 파일이 없습니다. 환경변수를 설정해주세요."
    echo "   .env.example을 참고하여 .env 파일을 생성하세요."
fi

# 백엔드 의존성 설치
echo "📦 백엔드 의존성 설치 중..."
npm install

# 프론트엔드 빌드
echo "🏗️  프론트엔드 빌드 중..."
cd vite-project
npm install
npm run build
cd ..

# PM2로 서버 재시작 (이미 실행 중인 경우)
if pm2 list | grep -q "mahimahi-server"; then
    echo "🔄 PM2 서버 재시작 중..."
    pm2 restart mahimahi-server
else
    echo "▶️  PM2 서버 시작 중..."
    pm2 start server.js --name mahimahi-server
    pm2 save
fi

echo "✅ 배포가 완료되었습니다!"
echo ""
echo "📊 서버 상태 확인: pm2 status"
echo "📋 로그 확인: pm2 logs mahimahi-server"
echo "🔄 서버 재시작: pm2 restart mahimahi-server"
echo "⏹️  서버 중지: pm2 stop mahimahi-server"

