import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetScrollView,
} from '@gorhom/bottom-sheet'
import { useCallback, useEffect, useMemo, useRef } from 'react'
import { colors } from '../../../styles/colors'
import { useBottomSheetStore } from '../../store/bottomsheet-store'

const MAX_OPEN_ATTEMPTS = 8
const OPEN_RETRY_DELAY_MS = 32

export const AppBottomSheet = () => {
  const { content, isOpen, config, close } = useBottomSheetStore()
  const bottomSheetRef = useRef<BottomSheet>(null)
  const openAttemptRef = useRef(0)

  const snapPoints = useMemo(
    () => config?.snapPoints ?? ['80%', '90%'],
    [config?.snapPoints],
  )

  useEffect(() => {
    requestAnimationFrame(() => {
      bottomSheetRef.current?.close()
    })
  }, [])

  const snapOpen = useCallback(() => {
    const sheet = bottomSheetRef.current

    if (sheet) {
      sheet.snapToIndex(0)
      openAttemptRef.current = 0
      return true
    }

    return false
  }, [])

  const trySnapOpen = useCallback(
    function trySnap(attempt = 0) {
      if (!useBottomSheetStore.getState().isOpen) return

      if (snapOpen()) return

      if (attempt < MAX_OPEN_ATTEMPTS) {
        setTimeout(() => trySnap(attempt + 1), OPEN_RETRY_DELAY_MS)
      }
    },
    [snapOpen],
  )

  useEffect(() => {
    if (!isOpen || !content) return

    openAttemptRef.current = 0

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        trySnapOpen()
      })
    })
  }, [isOpen, content, trySnapOpen])

  useEffect(() => {
    if (!isOpen) {
      bottomSheetRef.current?.close()
    }
  }, [isOpen])

  const handleSheetChanges = useCallback(
    (index: number) => {
      if (index === -1 && useBottomSheetStore.getState().isOpen) {
        close()
      }
    },
    [close],
  )

  const renderBackdrop = useCallback((props: BottomSheetBackdropProps) => {
    return (
      <BottomSheetBackdrop
        {...props}
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        opacity={0.7}
        pressBehavior="close"
      />
    )
  }, [])

  return (
    <BottomSheet
      ref={bottomSheetRef}
      backgroundStyle={{
        backgroundColor: colors.background,
        borderTopLeftRadius: 32,
        borderTopRightRadius: 32,
      }}
      backdropComponent={renderBackdrop}
      enablePanDownToClose={config?.enablePanDownToClose ?? true}
      index={-1}
      snapPoints={snapPoints}
      onChange={handleSheetChanges}
    >
      <BottomSheetScrollView>{content}</BottomSheetScrollView>
    </BottomSheet>
  )
}
