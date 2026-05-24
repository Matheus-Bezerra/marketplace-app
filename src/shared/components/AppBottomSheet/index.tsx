import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetScrollView,
} from '@gorhom/bottom-sheet'
import {
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { colors } from '../../../styles/colors'
import { useBottomSheetStore } from '../../store/bottomsheet-store'

export const AppBottomSheet = () => {
  const { content, isOpen, config, close } = useBottomSheetStore()
  const bottomSheetRef = useRef<BottomSheet>(null)
  const [displayedContent, setDisplayedContent] = useState<ReactNode | null>(
    null,
  )

  useEffect(() => {
    if (content) {
      setDisplayedContent(content)
    }
  }, [content])

  const snapPoints = useMemo(
    () => config?.snapPoints || ['80%', '90%'],
    [config?.snapPoints],
  )

  useEffect(() => {
    if (isOpen && content) {
      bottomSheetRef.current?.snapToIndex(0)
    }
  }, [isOpen, content])

  useEffect(() => {
    if (!isOpen && displayedContent) {
      bottomSheetRef.current?.close()
    }
  }, [isOpen, displayedContent])

  const handleSheetChanges = useCallback(
    (index: number) => {
      if (index === -1) {
        setDisplayedContent(null)
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

  if (!displayedContent) {
    return null
  }

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
      <BottomSheetScrollView>{displayedContent}</BottomSheetScrollView>
    </BottomSheet>
  )
}
